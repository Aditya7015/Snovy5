// import express, { Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import { connectDB } from "./config/db";
// import authRoutes from "./routes/auth.routes";
// import productRoutes from "./routes/product.routes";
// import orderRoutes from "./routes/order.routes";
// import path from "path";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());
// // serve uploads
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// // mount routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// // health
// app.get("/", (req: Request, res: Response) => {
//   res.send("Snovy API Running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));


import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import router from "./routes/auth.routes";

dotenv.config();
connectDB();

const app = express();
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// Routes Coming Soon...

app.use("/user",router);

app.get("/", (req: Request, res: Response) => {
  res.send("Snovy API Running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
