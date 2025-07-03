import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || typeof email !== "string" || !emailRegex.test(email.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Check if user already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
        });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Check password
        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: "Password not set for user",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        // Set cookie and send response
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true, // Fixed typo: httpsOnly -> httpOnly
                sameSite: "strict",
            })
            .json({
                success: true,
                message: `Welcome back ${user.firstName}`, // Fixed typo: Uuer -> user
                user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
            });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
