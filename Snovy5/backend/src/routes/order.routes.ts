// import { Router } from "express";
// import Order from "../models/Order";
// import { attachUser } from "../middleware/auth";
// import { body, validationResult } from "express-validator";

// const router = Router();

// function handleValidation(req: any, res: any, next: any) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
//   next();
// }

// router.post("/",
//   attachUser,
//   body("items").isArray({ min: 1 }),
//   body("total").isFloat({ min: 0 }),
//   handleValidation,
//   async (req, res) => {
//     try {
//       const user = (req as any).user;
//       const { items, total } = req.body;
//       const order = new Order({
//         userId: user._id,
//         items,
//         total: Number(total)
//       });
//       await order.save();
//       res.status(201).json(order);
//     } catch (err) {
//       console.error("create order err", err);
//       res.status(500).json({ error: "Server error" });
//     }
//   });

// router.get("/", attachUser, async (req, res) => {
//   try {
//     const user = (req as any).user;
//     if (user.isAdmin) {
//       const all = await Order.find().sort({ createdAt: -1 }).lean();
//       return res.json(all);
//     } else {
//       const own = await Order.find({ userId: user._id }).sort({ createdAt: -1 }).lean();
//       return res.json(own);
//     }
//   } catch (err) {
//     console.error("list orders err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;
