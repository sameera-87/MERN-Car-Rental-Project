import {
    registerUserService,
    loginUserService,
} from "../services/userService.js";

import {
    getAllCarsService,
    getAvailableCarsService,
} from "../services/carService.js";

// Register user
export const registerUser = async (req, res) => {
    try {
        const token = await registerUserService(req.body);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const token = await loginUserService(req.body);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get user data (from JWT middleware)
export const getUserData = async (req, res) => {
    try {
        res.json({ success: true, user: req.user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all cars
export const getCars = async (req, res) => {
    try {
        const cars = await getAllCarsService();
        res.json({ success: true, cars });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get cars using date & location
export const getCarsUsingDates = async (req, res) => {
    try {
        const cars = await getAvailableCarsService(req.query);
        res.json({ success: true, cars });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
