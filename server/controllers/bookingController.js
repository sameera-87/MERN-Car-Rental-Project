import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

// Function to check the Availabilty of Car for a given date
const checkAvailabilty = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })

    return bookings.length === 0;
}

// API to check availabilty of cars for the given Date and location
export const checkAvailabiltyOfCar = async (req, res) => {
    try {
        const {location, pickupDate, returnDate} = req.body

        // fetch all available cars for the given location
        const cars = await Car.find({location, isAvaliable: true})

        // check car availability for the given date range using promise
        const availableCarPromises = cars.map(async (car) => {
            const isAvaliable = await checkAvailabilty(car._id, pickupDate, returnDate)
            return {...car._doc, isAvaliable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarPromises);
        availableCars = availableCars.filter(car => isAvailable === true)

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API toc create Booking
export const createBooking = async (req, res) => {
    try{
        const {_id} = req.user;
        const {car, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailabilty(car, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success: false, message: "Car is not available"})
        }

        const carData = await Car.findById(car)

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})

        // Update availability
        carData.isAvailable = false; // or toggle if needed
        await carData.save();

        res.json({success: true, message: "Booking Created"})

    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to list user booking
export const getUserBooking = async (req, res) => {
    try{
        const {_id} = req.user;
        const bookings = await Booking.find({ user: _id}).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Owner Bookings
export const getOwnerBooking = async (req, res) => {
    try{
        if(req.user.role !== 'owner'){
            return res.json({ sucess: false, message: "Unauthorized"})
        }

        const bookings = await Booking.find({owner: req.user._id}).populate('car user')
        .select("-user,password").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to change the booking status
export const changeBookingStatus = async (req, res) => {
    try{
        const {_id} = req.user;
        const {bookingId, status} = req.body;

        const booking = await Booking.findById(bookingId)        

        if(booking.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();

        // When the owner cancel the booking the car should be available again
        if(status == "cancelled") {
            const car = await Car.findById(booking.car)
            car.isAvailable = true;
            await car.save();
        }

        res.json({success: true, message: `Status is changed to ${status}`});

    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}