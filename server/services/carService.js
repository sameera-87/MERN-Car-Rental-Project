import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import ImageKit from "../configs/imagekit.js";
import fs from "fs";

// get all cars
export const getAllCarsService = async () => {
    return await Car.find();
};


// get available cars
export const getAvailableCarsService = async ({
    pickupLocation,
    pickupDate,
    returnDate
}) => {
    const pickupStart = new Date(pickupDate);
    pickupStart.setHours(0, 0, 0, 0);

    const returnEnd = new Date(returnDate);
    returnEnd.setHours(23, 59, 59, 999);

    const bookedCars = await Booking.distinct("car", {
        status: { $ne: "cancelled" },
        pickupAt: { $lt: returnEnd },
        returnAt: { $gt: pickupStart }
    });

    return await Car.find({
        _id: { $nin: bookedCars },
        location: pickupLocation
    });
};

// Add a car
export const addCarService = async (ownerId, carData, imageFile) => {
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

    await Car.create({ ...car, owner: ownerId, image });
};

// get all the cars of an owner
export const getOwnerCarsService = async (ownerId) => {
    return await Car.find({ owner: ownerId });
};

// change the availability of the car
export const toggleCarAvailabilityService = async (ownerId, carId) => {
    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== ownerId.toString()) {
        throw new Error("Unauthorized");
    }

    car.isAvailable = !car.isAvailable;
    await car.save();
};

// delete a car
export const deleteCarService = async (ownerId, carId) => {
    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== ownerId.toString()) {
        throw new Error("Unauthorized");
    }

    // Soft delete
    car.owner = null;
    car.isAvailable = false;
    await car.save();
};



