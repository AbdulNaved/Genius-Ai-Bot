import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

// Named export for utility class merging function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Named export for MongoDB connection
export async function connectToDatabase() {
  try {
    // Avoid multiple connections
    if (mongoose.connection.readyState) {
      console.log("Already connected to the database");
      return;
    }

    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.error("MONGO_URL is not set");
      throw new Error("MONGO_URL is not configured");
    }

    const { connection } = await mongoose.connect(mongoUrl, {
      dbName: "nextAuth",
    });

    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Error connecting to database");
  }
}
