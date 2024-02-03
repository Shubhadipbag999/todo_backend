import express from "express";
import { addTodo, getMyTask, updateTask, deleteTask } from "../controllers/taskControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const todoRouter = express.Router();

todoRouter.post("/todos/new", isAuthenticated, addTodo)
todoRouter.get("/todos/my", isAuthenticated, getMyTask)
todoRouter.put("/todos/:id", isAuthenticated, updateTask)
todoRouter.delete("/todos/:id", isAuthenticated, deleteTask)