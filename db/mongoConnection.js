import mongoose from "mongoose";

export const mongoConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "todoApp"
    })
        .then(() => {
            console.log(`Connected to mongodb`)
        })
        .catch(err => console.log(err))
}

