import {
    changeRoleToOwnerService,
    updateUserImageService
} from "../services/userService.js";

import {
    addCarService,
    getOwnerCarsService,
    toggleCarAvailabilityService,
    deleteCarService
} from "../services/carService.js";

import {
    getDashboardDataService
} from "../services/ownerService.js";

// Change role
export const changeRoleToOwner = async (req, res) => {
    try {
        await changeRoleToOwnerService(req.user._id);
        res.json({ success: true, message: "Now you can list cars" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Add car
export const addCar = async (req, res) => {
    try {
        await addCarService(req.user._id, req.body.carData, req.file);
        res.json({ success: true, message: "Car added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get owner cars
export const getOwnerCars = async (req, res) => {
    try {
        const cars = await getOwnerCarsService(req.user._id);
        res.json({ success: true, cars });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Toggle availability
export const toggleCarAvailailty = async (req, res) => {
    try {
        await toggleCarAvailabilityService(req.user._id, req.body.carId);
        res.json({ success: true, message: "Availability toggled" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete car
export const deleteCar = async (req, res) => {
    try {
        await deleteCarService(req.user._id, req.body.carId);
        res.json({ success: true, message: "Car removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Dashboard
export const getDashboardData = async (req, res) => {
    try {
        if (req.user.role !== "owner") {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const dashboardData = await getDashboardDataService(req.user._id);
        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update profile image
export const updateUserImage = async (req, res) => {
    try {
        await updateUserImageService(req.user._id, req.file);
        res.json({ success: true, message: "Image updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
