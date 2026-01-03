import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import ImageKit from "../configs/imagekit.js";
import fs from "fs";

// Change role to owner
export const changeRoleToOwnerService = async (userId) => {
    await User.findByIdAndUpdate(userId, { role: "owner" });
};

// Add car
export const addCarService = async (userId, carData, imageFile) => {
    const car = JSON.parse(carData);

    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResponse = await ImageKit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/cars",
    });

    const image = ImageKit.url({
        path: uploadResponse.filePath,
        transformation: [
            { width: "1280" },
            { quality: "auto" },
            { format: "webp" },
        ],
    });

    await Car.create({ ...car, owner: userId, image });
};

// Get owner cars
export const getOwnerCarsService = async (ownerId) => {
    return await Car.find({ owner: ownerId });
};

// Toggle availability
export const toggleCarAvailabilityService = async (ownerId, carId) => {
    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== ownerId.toString()) {
        throw new Error("Unauthorized");
    }

    car.isAvailable = !car.isAvailable;
    await car.save();
};

// Delete car (soft delete)
export const deleteCarService = async (ownerId, carId) => {
    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== ownerId.toString()) {
        throw new Error("Unauthorized");
    }

    car.owner = null;
    car.isAvailable = false;
    await car.save();
};

// Dashboard data
export const getDashboardDataService = async (ownerId) => {
    const cars = await Car.find({ owner: ownerId });
    const bookings = await Booking.find({ owner: ownerId })
        .populate("car")
        .sort({ createdAt: -1 });

    const pendingBookings = bookings.filter(b => b.status === "pending");
    const completedBookings = bookings.filter(b => b.status === "confirmed");

    const monthlyRevenue = completedBookings.reduce(
        (acc, booking) => acc + booking.price,
        0
    );

    return {
        totalCars: cars.length,
        totalBookings: bookings.length,
        pendingBookings: pendingBookings.length,
        completedBookings: completedBookings.length,
        recentBookings: bookings.slice(0, 3),
        monthlyRevenue,
    };
};

// Update user image
export const updateUserImageService = async (userId, imageFile) => {
    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResponse = await ImageKit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/users",
    });

    const image = ImageKit.url({
        path: uploadResponse.filePath,
        transformation: [
            { width: "400" },
            { quality: "auto" },
            { format: "webp" },
        ],
    });

    await User.findByIdAndUpdate(userId, { image });
};
