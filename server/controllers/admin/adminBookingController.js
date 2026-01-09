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
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Bookings starting today
 */
export const getBookingsStartingToday = async (req, res) => {
  try {
    const bookings = await getBookingsStartingTodayService();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Bookings ending today
 */
export const getBookingsEndingToday = async (req, res) => {
  try {
    const bookings = await getBookingsEndingTodayService();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Confirmed but unpaid bookings
 */
export const getConfirmedUnpaidBookings = async (req, res) => {
  try {
    const bookings = await getConfirmedUnpaidBookingsService();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
