import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.MONGODB_PASSWORD;
const username = process.env.MONGODB_USERNAME;

const MONGODB_URL = `mongodb://${username}:${password}@localhost:27014`
const connection = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database connection established");
    } catch (error) {
        console.log("Database connection error: " + error);
    }
    
}
export default connection;