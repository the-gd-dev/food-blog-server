import { getUser, createUser } from "@controllers";
import { Router } from "express";
const router = Router();

router.get("/:id", getUser);
router.post("/create", createUser);

export default router;
