import express from 'express';
import { register, getMyprofile, getAllUsers, login, logout } from '../controllers/usercontrollers.js'
import { isAuthenticated } from "../middlewares/auth.js";
export const userRouter = express.Router();


userRouter.post("/register", register);
userRouter.get("/users/profile", isAuthenticated, getMyprofile);
userRouter.get("/users", getAllUsers)
userRouter.post("/login", login)
userRouter.get("/logout", isAuthenticated, logout)