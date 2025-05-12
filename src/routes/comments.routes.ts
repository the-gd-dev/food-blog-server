import { createComment, deleteComment, updateComment } from "@controllers";
import { authenticateUser } from "@middlewares";
import { Router } from "express";
const router = Router();

router.post("/create", authenticateUser, createComment);
router.post("/delete", authenticateUser, deleteComment);
router.put("/:commentId/update", authenticateUser, updateComment);
export default router;
