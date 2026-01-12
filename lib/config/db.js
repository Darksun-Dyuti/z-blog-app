import mongoose from "mongoose";

let cachedConnection = null;

export const ConnectDB = async () => {
    // Return cached connection if available
    if (cachedConnection) {
        console.log("Using cached DB connection")
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(
            'mongodb+srv://Darksun:Dyutimoy1234@z-blog-app.akzi0t8.mongodb.net/z-blog-app',
            {
                maxPoolSize: 10,
                minPoolSize: 2,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            }
        );
        cachedConnection = connection;
        console.log("DB Connected successfully");
        return connection;
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        throw error;
    }
}