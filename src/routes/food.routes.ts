import {
  createPost,
  deletePost,
  getAll,
  getPost,
  updatePost,
} from "@controllers";
import { authenticateUser } from "@middlewares";
import { Router } from "express";

const router = Router();

router.get("/", getAll);
router.post("/create", authenticateUser, createPost);
router.put("/:id/update", authenticateUser, updatePost);
router.get("/:id", getPost);
router.delete("/:id/delete", authenticateUser, deletePost);

export default router;
