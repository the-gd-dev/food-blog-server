import { getUser, createUser, updateUser } from "@controllers";
import { authenticateUser } from "@middlewares";
import { Router } from "express";
const router = Router();

router.get("/:id", getUser);
router.post("/create", createUser);
router.put("/update", authenticateUser, updateUser);

export default router;
