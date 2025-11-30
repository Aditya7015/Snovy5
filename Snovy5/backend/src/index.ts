import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./config/db";
import router from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import orderRouter from "./routes/order.routes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials: true,
  })
);

app.use(cookieParser());

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// PUBLIC SHOP PRODUCT ROUTES
app.use("/products", productRouter);

// 🔹 ORDERS ROUTES (user + admin)
app.use("/", orderRouter); // gives /orders and /admin/orders

// ADMIN PROTECTED ROUTES (CRUD)
app.use("/admin/products", productRouter);

// USER AUTH ROUTES
app.use("/user", router);

// ROOT TEST
app.get("/", (req: Request, res: Response) => {
  res.send("Snovy API Running Successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
