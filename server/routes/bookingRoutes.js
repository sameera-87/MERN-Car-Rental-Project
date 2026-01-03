import express from "express";
import { protect } from "../middleware/auth.js";
import { changeBookingStatus, checkAvailabiltyOfCar, createBooking, getCalculatedPrice, getOwnerBooking, getUserBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabiltyOfCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUserBooking)
bookingRouter.get('/owner', protect, getOwnerBooking)
bookingRouter.post('/change-status', protect, changeBookingStatus)
bookingRouter.get('/price', protect, getCalculatedPrice)

export default bookingRouter;