import express from 'express';
import dotenv from 'dotenv';
import { mongoConnection } from "./db/mongoConnection.js"
import { userRouter } from './routes/userRoutes.js';
import { todoRouter } from './routes/taskRoutes.js';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

dotenv.config({
    path: "./db/config.env"
})
mongoConnection()

app.use(cors({
    origin: [process.env.FRONTEND_URI],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}))


app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", userRouter)
app.use("/api/v2", todoRouter)

app.use(errorMiddleware)




app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})