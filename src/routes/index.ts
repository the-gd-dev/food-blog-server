import { authenticateUser } from "@middlewares";
import { Router } from "express";
import fs from "fs";
import path from "path";
import authRoutes from "./auth.routes";
import foodRoutes from "./food.routes";
import userRoutes from "./user.routes";
import commentsRoutes from "./comments.routes";

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, "../..", "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

const router = Router();

//prefixed routes
router.use("/", authRoutes);
router.use("/users", authenticateUser, userRoutes);
router.use("/food-posts/comments", commentsRoutes);
router.use("/food-posts", foodRoutes);

export default router;
