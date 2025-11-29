// import { RequestHandler } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User";

// const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// export interface AuthPayload {
//   id: string;
//   email: string;
//   isAdmin?: boolean;
//   iat?: number;
//   exp?: number;
// }

// export const attachUser: RequestHandler = async (req, res, next) => {
//   try {
//     const auth = req.headers.authorization || req.cookies?.token;
//     if (!auth) return res.status(401).json({ error: "Missing Authorization" });

//     const token = (auth as string).startsWith("Bearer ") ? (auth as string).split(" ")[1] : auth;
//     const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
//     if (!payload?.id) return res.status(401).json({ error: "Invalid token" });

//     // fetch user or admin flag from DB
//     const user = await User.findById(payload.id).select("-password").lean();
//     if (!user) return res.status(401).json({ error: "User not found" });

//     (req as any).user = { ...user, isAdmin: payload.isAdmin || user.isAdmin };
//     next();
//   } catch (err: any) {
//     console.error("attachUser err", err?.message || err);
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };

// export const adminOnly: RequestHandler = (req, res, next) => {
//   const user = (req as any).user;
//   if (!user || !user.isAdmin) return res.status(403).json({ error: "Admin only" });
//   next();
// };
