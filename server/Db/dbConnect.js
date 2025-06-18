import mongoose from "mongoose"

export function connectDb() {
    console.log(process.env.MONGO_URI)

    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(error => console.log(error))
}
