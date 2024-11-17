import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"
import "dotenv/config"
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);


        console.log(`Connected to MongoDB : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;