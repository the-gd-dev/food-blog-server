import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import { authenticateUser } from "@middlewares";

const router = Router();

//prefixed routes
router.use("/", authRoutes);
router.use("/users", authenticateUser, userRoutes);

export default router;
