import {
    getAvailableCarsService,
    createBookingService,
    getUserBookingsService,
    getOwnerBookingsService,
    changeBookingStatusService,
    calculateBookingPrice,
} from "../services/bookingService.js";

// Check availability
export const checkAvailabiltyOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        const availableCars = await getAvailableCarsService(
            location,
            pickupDate,
            returnDate
        );

        res.json({ success: true, availableCars });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Create booking
export const createBooking = async (req, res) => {
    try {
        const { car, pickupAt, returnAt } = req.body;

        await createBookingService(
            req.user._id,
            car,
            pickupAt,
            returnAt
        );

        res.json({ success: true, message: "Booking created" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// User bookings
export const getUserBooking = async (req, res) => {
    try {
        const bookings = await getUserBookingsService(req.user._id);
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Owner bookings
export const getOwnerBooking = async (req, res) => {
    try {
        if (req.user.role !== "owner") {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const bookings = await getOwnerBookingsService(req.user._id);
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;

        await changeBookingStatusService(
            req.user._id,
            bookingId,
            status
        );

        res.json({
            success: true,
            message: `Status changed to ${status}`,
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// get the calculated price of the booking
export const getCalculatedPrice = async(req, res) => {
    try {
        const {pricePerDay, pickupAt, returnAt} =  req.query;
        const calculatedPrice = calculateBookingPrice(pricePerDay, pickupAt, returnAt);

        res.json({success: true, calculatedPrice});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}