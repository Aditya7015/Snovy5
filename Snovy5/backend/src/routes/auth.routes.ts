import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

// helper
function handleValidation(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

router.post("/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  handleValidation,
  async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: "Email already registered" });

      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashed, firstName, lastName });
      await user.save();

      const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.json({ id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, token });
    } catch (err) {
      console.error("register err", err);
      res.status(500).json({ error: "Server error" });
    }
  });

router.post("/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  handleValidation,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.json({ id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin, token });
    } catch (err) {
      console.error("login err", err);
      res.status(500).json({ error: "Server error" });
    }
  });

// simple admin login route (assuming admins are flagged in users collection with isAdmin true)
router.post("/admin/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  handleValidation,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !user.isAdmin) return res.status(401).json({ error: "Invalid admin credentials" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: "Invalid admin credentials" });

      const token = jwt.sign({ id: user._id, email: user.email, isAdmin: true }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.json({ id: user._id, email: user.email, name: `${user.firstName || ""} ${user.lastName || ""}`.trim(), token });
    } catch (err) {
      console.error("admin login err", err);
      res.status(500).json({ error: "Server error" });
    }
  });

export default router;
