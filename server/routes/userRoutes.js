import express from "express";
import { loginUser, registerUser, getUserData, getCarsUsingDates, getCars } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { chatHandler } from "../controllers/chatController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars', getCars)
userRouter.get('/cars-dates', getCarsUsingDates)
userRouter.post("/chatbot-message", protect, chatHandler);

export default userRouter;

