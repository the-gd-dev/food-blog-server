import {
  changePassword,
  forgotPassword,
  login,
  register,
  verify,
  logout,
} from "@controllers";
import { authenticateUser } from "@middlewares";
import { Router } from "express";

const router = Router();
router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);
router.get("/verify", authenticateUser, verify);
router.post("/logout", authenticateUser, logout);

export default router;
