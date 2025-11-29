// import { Router } from "express";
// import Product from "../models/Product";
// import { attachUser, adminOnly } from "../middleware/auth";
// import multer from "multer";
// import path from "path";
// import cloudinary from "../config/cloudinary";
// import fs from "fs";

// const router = Router();

// // multer local storage
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8) + ext);
//   }
// });
// const upload = multer({ storage });

// // list with pagination, q, category
// router.get("/", async (req, res) => {
//   try {
//     const q = (req.query.q as string) || "";
//     const category = (req.query.category as string) || "";
//     const page = Math.max(1, parseInt((req.query.page as string) || "1"));
//     const limit = Math.max(1, Math.min(100, parseInt((req.query.limit as string) || "12")));
//     const skip = (page - 1) * limit;

//     const filter: any = {};
//     if (q) filter.$or = [{ name: new RegExp(q, "i") }, { description: new RegExp(q, "i") }];
//     if (category) filter.category = category;

//     const total = await Product.countDocuments(filter);
//     const docs = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

//     res.json({
//       data: docs,
//       meta: {
//         page, limit, total, pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (err) {
//     console.error("products list err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const prod = await Product.findById(req.params.id).lean();
//     if (!prod) return res.status(404).json({ error: "Not found" });
//     res.json(prod);
//   } catch (err) {
//     console.error("product get err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // create (admin)
// router.post("/", attachUser, adminOnly, upload.array("images", 6), async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;
//     let images: string[] = [];

//     if (req.files && (req.files as Express.Multer.File[]).length > 0) {
//       // if cloudinary is configured, upload; else use local /uploads paths
//       if (process.env.CLOUDINARY_CLOUD_NAME) {
//         for (const f of req.files as Express.Multer.File[]) {
//           const r = await cloudinary.uploader.upload(f.path, { folder: "snovy" });
//           images.push(r.secure_url);
//           // cleanup local file
//           try { fs.unlinkSync(f.path); } catch {}
//         }
//       } else {
//         images = (req.files as Express.Multer.File[]).map(f => `/uploads/${path.basename(f.path)}`);
//       }
//     }

//     const p = new Product({
//       name,
//       description,
//       price: Number(price || 0),
//       images,
//       category: category || "",
//       stock: Number(stock || 0)
//     });
//     await p.save();
//     res.status(201).json(p);
//   } catch (err) {
//     console.error("create product err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // update
// router.put("/:id", attachUser, adminOnly, upload.array("images", 6), async (req, res) => {
//   try {
//     const existing = await Product.findById(req.params.id);
//     if (!existing) return res.status(404).json({ error: "Not found" });

//     const { name, description, price, category, stock } = req.body;
//     if (name) existing.name = name;
//     if (description) existing.description = description;
//     if (price !== undefined) existing.price = Number(price);
//     if (category) existing.category = category;
//     if (stock !== undefined) existing.stock = Number(stock);

//     if (req.files && (req.files as Express.Multer.File[]).length > 0) {
//       let images: string[] = [];
//       if (process.env.CLOUDINARY_CLOUD_NAME) {
//         for (const f of req.files as Express.Multer.File[]) {
//           const r = await cloudinary.uploader.upload(f.path, { folder: "snovy" });
//           images.push(r.secure_url);
//           try { fs.unlinkSync(f.path); } catch {}
//         }
//       } else {
//         images = (req.files as Express.Multer.File[]).map(f => `/uploads/${path.basename(f.path)}`);
//       }
//       existing.images = images;
//     }

//     await existing.save();
//     res.json(existing);
//   } catch (err) {
//     console.error("update product err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // delete
// router.delete("/:id", attachUser, adminOnly, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ ok: true });
//   } catch (err) {
//     console.error("delete product err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;



