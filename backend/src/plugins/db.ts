import mongoose from "mongoose";

export async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI!;
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}