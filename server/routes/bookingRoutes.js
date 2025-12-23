import express from "express";
import { protect } from "../middleware/auth.js";
import { changeBookingStatus, checkAvailabiltyOfCar, createBooking, getOwnerBooking, getUSerBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabiltyOfCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUSerBooking)
bookingRouter.get('/owner', protect, getOwnerBooking)
bookingRouter.post('/change-status', protect, changeBookingStatus)

export default bookingRouter;