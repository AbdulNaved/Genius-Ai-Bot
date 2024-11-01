// correct 

import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

// Fixing the cn function syntax
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Database connection logic
export const connectToDatabase = async () => {
  try {
    // Check if mongoose is already connected
    if (mongoose.connection.readyState) {
      console.log("Already connected to the database");
      return;
    }

    const { connection } = await mongoose.connect(process.env.MONGO_URL as string, {
      dbName: "nextAuth",
    });

    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};
