import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import Car from "../models/Car.js"
dotenv.config();


// Generate JWT Token 
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// register user
export const registerUser = async (req, res)=> {
    try{
        const {name, email, password} = req.body

        // console.log(name)
        // console.log(email)
        // console.log(password)


        if(!name || !email || !password || password.length < 8) {
            return res.json({success: false, message: 'Fill all the fields'})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})
        const token = generateToken(user._id.toString())
        res.json({success: true, token})

    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Login user
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})        
    }
}

// Get user data using token (jwt)
export const getUserData = async (req, res) => {
    try{
        const {user} = req;
        console.log(user);
        res.json({success:true, user})
    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get all cars for the frontend
export const getCars = async (req, res) => {
    try{
        const cars = await Car.find({isAvailable: true})

        // const cars = await Car.find({isAvaliable: false})
        // console.log("getCarFunction called")
        // console.log(cars)
        
        res.json({success: true, cars})
    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}