import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(uri, {
      // useNewUrlParser/useUnifiedTopology not required in mongoose v6+
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err);
    process.exit(1);
  }
};
