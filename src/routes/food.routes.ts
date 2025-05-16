import {
  createPost,
  deletePost,
  getAll,
  getAllComments,
  getPost,
  updatePost,
  uploadFile as uploadFileController,
} from "@controllers";
import { authenticateUser } from "@middlewares";
import { uploadFile } from "@utils";
import { Router } from "express";

const router = Router();
router.get("/", getAll);
router.get("/:postId/comments", getAllComments);
router.post("/create", authenticateUser, createPost);
router.put("/:id/update", authenticateUser, updatePost);
router.get("/:id", getPost);
router.delete("/:id/delete", authenticateUser, deletePost);
router.post("/image/upload", authenticateUser, uploadFile.single("file"), uploadFileController);

export default router;
