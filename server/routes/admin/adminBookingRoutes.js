import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/adminMiddleware.js";

import {
  getActiveConfirmedBookings,
  getBookingsStartingToday,
  getBookingsEndingToday,
  getConfirmedUnpaidBookings,
} from "../../controllers/admin/adminBookingController.js";

const router = express.Router();

// Admin → Booking Insights
router.get("/active", protect, adminOnly, getActiveConfirmedBookings);
router.get("/starting-today", protect, adminOnly, getBookingsStartingToday);
router.get("/ending-today", protect, adminOnly, getBookingsEndingToday);
router.get("/confirmed-unpaid", protect, adminOnly, getConfirmedUnpaidBookings);

export default router;
