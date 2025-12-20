import jwt from "jsonwebtoken";
import User from "../models/User.js"
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next)=>{

    try{
        const authHeader = req.headers.authorization;

        console.log("Auth Header: ", authHeader);

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.json({success: false, message: "not authorized"});
        }

        const token = authHeader.split(" ")[1];
        console.log("Token: ", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded: ", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.json({ sucess: false, message: "not authorized"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Auth Error: ", error.message);
        return res.json({ success: false, message: "not authorized"});
    }

    // const token = req.headers.authorization;

    // console.log(token)

    // if(!token){
    //     return res.json({success: false, message: "not authorized"})
    // }
    // try{
    //     const userId = jwt.decode(token, process.env.JWT_SECRET)
    //     console.log(userId)

    //     if(!userId){
    //         return res.json({success: false, message: "not authorized"})
    //     }
    //     req.user = await User.findById(userId).select("-password")
    //     next();
    // } catch (error){
    //     return res.json({success: false, message: "not authorized"})
    // }
};