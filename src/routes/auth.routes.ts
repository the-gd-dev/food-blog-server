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
router.get("/login", login);
router.get("/register", register);
router.get("/forgot-password", forgotPassword);
router.get("/change-password", changePassword);
router.get("/verify", authenticateUser, verify);
router.get("/logout", authenticateUser, logout);

export default router;
