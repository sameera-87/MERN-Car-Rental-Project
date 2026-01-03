import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import ImageKit from "../configs/imagekit.js";
import fs from "fs";

// Register user
export const registerUserService = async ({ name, email, password }) => {
    if (!name || !email || !password || password.length < 8) {
        throw new Error("Fill all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id.toString());
    return token;
};

// Login user
export const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());
    return token;
};

// change role to the owner
export const changeRoleToOwnerService = async (userId) => {
    await User.findByIdAndUpdate(userId, { role: "owner" });
};

// update user image
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
