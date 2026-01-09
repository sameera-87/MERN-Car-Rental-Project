import Booking from "../../models/Booking.js";

// Helper: populate config
const bookingPopulate = [
  { path: "user", select: "name email" },
  { path: "car", select: "name brand" },
];

/**
 * Active confirmed bookings (currently ongoing)
 */
export const getActiveConfirmedBookingsService = async () => {
  const now = new Date();

  return await Booking.find({
    status: "confirmed",
    pickupAt: { $lte: now },
    returnAt: { $gte: now },
  }).populate(bookingPopulate);
};

/**
 * Bookings starting today
 */
export const getBookingsStartingTodayService = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return await Booking.find({
    pickupAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).populate(bookingPopulate);
};

/**
 * Bookings ending today
 */
export const getBookingsEndingTodayService = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return await Booking.find({
    returnAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).populate(bookingPopulate);
};

/**
 * Confirmed but unpaid bookings
 */
export const getConfirmedUnpaidBookingsService = async () => {
  return await Booking.find({
    status: "confirmed",
    paymentStatus: "unpaid",
  }).populate(bookingPopulate);
};
