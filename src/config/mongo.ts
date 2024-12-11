import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL as string);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default connectDB;
