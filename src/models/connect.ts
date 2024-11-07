import mongoose from "mongoose";
import { mongoDbUri } from "../config/config.env";

export async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
