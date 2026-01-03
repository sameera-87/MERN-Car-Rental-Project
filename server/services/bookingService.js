import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Internal helper (service-level)
export const checkAvailabilityService = async (carId, pickupAt, returnAt) => {
    const overlappingBooking = await Booking.findOne({
        car: carId,
        status: { $ne: "cancelled" },
        pickupAt: { $lt: returnAt },
        returnAt: { $gte: pickupAt },
    });

    return !overlappingBooking;
};

// Check availability by date & location
export const getAvailableCarsService = async (
    location,
    pickupDate,
    returnDate
) => {
    const pickupAt = new Date(pickupDate);
    const returnAt = new Date(returnDate);

    const cars = await Car.find({
        location,
        isAvailable: true,
    });

    const availabilityChecks = cars.map(async (car) => {
        const isAvailable = await checkAvailabilityService(
            car._id,
            pickupAt,
            returnAt
        );
        return isAvailable ? car : null;
    });

    const results = await Promise.all(availabilityChecks);
    return results.filter(Boolean);
};

// Create booking
export const createBookingService = async (
    userId,
    carId,
    pickupAt,
    returnAt
) => {
    const pickupTime = new Date(pickupAt);
    const returnTime = new Date(returnAt);

    if (pickupTime >= returnTime) {
        throw new Error("Return time must be after pickup time");
    }

    const isAvailable = await checkAvailabilityService(
        carId,
        pickupTime,
        returnTime
    );

    if (!isAvailable) {
        throw new Error("Car is not available for the selected time slot");
    }

    const car = await Car.findById(carId);
    if (!car) {
        throw new Error("Car not found");
    }

    const durationInHours =
        (returnTime - pickupTime) / (1000 * 60 * 60);

    if (durationInHours < 1) {
        throw new Error("Minimum booking duration is 1 hour");
    }

    const totalPrice =
        Math.ceil(durationInHours) * (car.pricePerDay / 24);

    await Booking.create({
        car: carId,
        owner: car.owner,
        user: userId,
        pickupAt: pickupTime,
        returnAt: returnTime,
        durationInHours: Math.ceil(durationInHours),
        price: totalPrice,
        status: "pending",
    });
};

// User bookings
export const getUserBookingsService = async (userId) => {
    return await Booking.find({ user: userId })
        .populate("car")
        .sort({ createdAt: -1 });
};

// Owner bookings
export const getOwnerBookingsService = async (ownerId) => {
    return await Booking.find({ owner: ownerId })
        .populate("car user", "-password")
        .sort({ createdAt: -1 });
};

// Change booking status
export const changeBookingStatusService = async (
    ownerId,
    bookingId,
    status
) => {
    const booking = await Booking.findById(bookingId);

    if (!booking || booking.owner.toString() !== ownerId.toString()) {
        throw new Error("Unauthorized");
    }

    booking.status = status;
    await booking.save();

    // Optional: restore availability on cancel
    if (status === "cancelled") {
        await Car.findByIdAndUpdate(booking.car, {
            isAvailable: true,
        });
    }
};
