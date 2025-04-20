import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

//prefixed routes
router.use("/users", userRoutes);

export default router;
