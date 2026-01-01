import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

// Function to check the Availabilty of Car for a given date
const checkAvailabilty = async (car, pickupAt, returnAt) => {
    const overlappingBooking = await Booking.findOne({
        car,
        status: {$ne : "cancelled"},
        pickupAt: {$lt: returnAt},
        returnAt: {$gte: pickupAt},
    })

    return !overlappingBooking;
}

// API to check availabilty of cars for the given Date and location
export const checkAvailabiltyOfCar = async (req, res) => {
    try {
        const {location, pickupDate, returnDate} = req.body

        // fetch all available cars for the given location
        const cars = await Car.find({location, isAvaliable: true})

        // check car availability for the given date range using promise
        const availableCarPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailabilty(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarPromises);
        availableCars = availableCars.filter(car => isAvailable === true)

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to create Booking
export const createBooking = async (req, res) => {
    try{
        const {_id} = req.user;
        const {car, pickupAt, returnAt} = req.body;

        const pickupTime = new Date(pickupAt);
        const returnTime = new Date(returnAt);

        // basic validation
        if(pickupTime >= returnTime){
            return res.json({
                success: false,
                message: "Return time must be after pickup time."
            })
        }

        // check availability
        const isAvailable = await checkAvailabilty(car, pickupTime, returnTime)
        if(!isAvailable){
            return res.json({
                success: false, 
                message: "Car is not available for the selected time slot"})
        }

        // Fetch car
        const carData = await Car.findById(car)
        if (!carData) {
            return res.json({ success: false, message: "Car not found" });
        }
        
        // Calculate duration (hours)
        const durationInHours = ((returnTime - pickupTime) / (1000 * 60 * 60));

        // booking should be more than 2 hours
        if(durationInHours < 1 ){
            return({
                success : false,
                message: "Minimum booking duration is 1 hour"
            });
        }

        // Price calculation
        const totalPrice = Math.ceil(durationInHours) * (carData.pricePerDay / 24);

        await Booking.create({
            car, 
            owner: carData.owner, 
            user: _id, 
            pickupAt: pickupTime,
            returnAt: returnTime,
            durationInHours: Math.ceil(durationInHours),
            price: totalPrice
        });

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