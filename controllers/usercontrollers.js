import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        if (!users) {
            if (!tasks) return next(new ErrorHandler("user not found", 404))
        }
        res.json({
            success: true,
            users,
        })
    }
    catch (err) {
        next(err);
    }

}


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        console.log(user)

        if (user) {
            return next(new ErrorHandler("user already exist pleasse login", 404))
        }
        else {
            const protectedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                email,
                password: protectedPassword
            })

            if (newUser) {
                console.log("User created successfully")
                res.status(200).json({
                    success: true,
                    message: "User created successfully"
                })

            }

        }
    } catch (error) {
        next(error);
    }


}

export const getMyprofile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            if (!tasks) return next(new ErrorHandler("user not found", 404))
        }
        res.status(200).json({ success: true, message: "user found successfully", user })
    } catch (error) {
        next(error);
    }


}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return next(new ErrorHandler("user not found", 404))
        }
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new ErrorHandler("Invalid Password", 404))
        }
        else {
            sendCookie(res, user, 201, "Login Successfully")
        }
    }
    catch (error) {
        next(error);
    }


}

export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),

        }).json({
            success: true,
            message: "Logout User successfully"
        })
    }
    catch (error) {
        next(error);
    }

}