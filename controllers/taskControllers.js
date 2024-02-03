import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskModel.js";


export const addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;
        await Task.create({
            title,
            description,
            user: userId
        })

        res.status(201).json({
            success: true,
            message: "Task Created"
        })
    } catch (error) {
        next(error);
    }

}

export const getMyTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        console.log(req.user._id)
        const tasks = await Task.find({ user: userId });
        if (!tasks) {
            if (!tasks) return next(new ErrorHandler("No Task Exist", 404))
        }

        res.status(200).json({
            success: true,
            message: "My All task Is Here",
            tasks
        })
    }
    catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404))
        task.isCompleted = !task.isCompleted;

        await task.save();
        res.status(200).json({
            success: true,
            message: 'Task upadates successfully'
        })
    } catch (error) {
        next(error);
    }

}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404))


        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Task Deleted successfully'
        })
    } catch (error) {
        next(error);
    }

}