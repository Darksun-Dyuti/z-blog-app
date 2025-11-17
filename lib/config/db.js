import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://Darksun:AB1234567@z-blog-app.akzi0t8.mongodb.net/z-blog-app')
    console.log("DB Connected")
}