import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Order from "../models/Order";
import { attachUser, adminOnly } from "../middleware/auth";

const router = Router();

/* Helpers */
const check = (req: Request, res: Response, next: any) => {
  const e = validationResult(req);
  if (!e.isEmpty()) return res.status(400).json({ errors: e.array() });
  next();
};

const format = (o: any) => ({
  id: o._id.toString(),
  userId: o.userId.toString(),
  date: o.createdAt,
  items: o.items,
  total: o.total,
  shippingAddress: o.shippingAddress,
  billingAddress: o.billingAddress,
  status: o.status,
  trackingNumber: o.trackingNumber,
  paymentMethod: o.paymentMethod,
});

/* CREATE ORDER - COD only */
router.post(
  "/orders",
  attachUser,
  body("items").isArray({ min: 1 }),
  check,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const { items, shippingAddress, billingAddress } = req.body;

      const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      const shippingCost = subtotal >= 999 ? 0 : 49;
      const total = subtotal + shippingCost;

      const order = await Order.create({
        userId: user._id,
        items,
        shippingAddress,
        billingAddress,
        total,
        paymentMethod: "cod",
      });

      res.status(201).json(format(order));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error creating order" });
    }
  }
);

/* USER: get own orders, ADMIN: get all */
router.get("/orders", attachUser, async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = user.isAdmin ? {} : { userId: user._id };
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders.map(format));
});

/* CANCEL ORDER */
router.patch("/orders/:id/cancel", attachUser, async (req, res) => {
  const user = (req as any).user;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });

  if (!user.isAdmin && order.userId.toString() !== user._id.toString())
    return res.status(403).json({ error: "Not allowed" });

  order.status = "canceled";
  await order.save();
  res.json(format(order));
});

/* ADMIN: Status update (tracking optional) */
router.patch(
  "/admin/orders/:id/status",
  attachUser,
  adminOnly,
  async (req, res) => {
    const { status, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Not found" });

    if (status) order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    await order.save();
    res.json(format(order));
  }
);

export default router;
