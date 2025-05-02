import { createComment, deleteComment, getAllComments } from "@controllers";
import { authenticateUser } from "@middlewares";
import { Router } from "express";
const router = Router();

router.post("/create", authenticateUser, createComment);
router.post("/delete", authenticateUser, deleteComment);

export default router;
