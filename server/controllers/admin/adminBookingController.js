import {
  getActiveConfirmedBookingsService,
  getBookingsStartingTodayService,
  getBookingsEndingTodayService,
  getConfirmedUnpaidBookingsService,
} from "../../services/admin/adminBookingService.js";

/**
 * Active confirmed bookings
 */
export const getActiveConfirmedBookings = async (req, res) => {
  try {
    const bookings = await getActiveConfirmedBookingsService();
    res.json({success: true, bookings});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Bookings starting today
 */
export const getBookingsStartingToday = async (req, res) => {
  try {
    const bookings = await getBookingsStartingTodayService();
    res.json({success: true, bookings});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Bookings ending today
 */
export const getBookingsEndingToday = async (req, res) => {
  try {
    const bookings = await getBookingsEndingTodayService();
    res.json({success: true, bookings});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

/**
 * Confirmed but unpaid bookings
 */
export const getConfirmedUnpaidBookings = async (req, res) => {
  try {
    const bookings = await getConfirmedUnpaidBookingsService();
    res.json({success: true, bookings});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
