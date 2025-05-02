import { INTERNAL_ERROR, SUCCESS } from "@constants";
import { Comment } from "@models";
import {
  commentSchema,
  excludeKeysFromObject,
  formattedYupErrors,
} from "@utils";
import { Request, Response } from "express";
import mongoose from "mongoose";

/**
 * Create comment related to post
 * @param req
 * @param res
 */
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find(
      { postId: new mongoose.Types.ObjectId(req.params.postId) },
      "-__v"
    ).populate("userId", 'name profilePicture');
    return res.status(SUCCESS.code).json({ ...SUCCESS, data: comments });
  } catch (error) {
    const validationError = formattedYupErrors(error);
    return res.status(validationError.code).json({ ...validationError, error });
  }
};

/**
 * Create comment related to post
 * @param req
 * @param res
 */
export const createComment = async (req: Request, res: Response) => {
  try {
    await commentSchema.validate(req.body, { abortEarly: false });
    const comment = await Comment.create({
      ...excludeKeysFromObject(req.body, ["_id", "id"]),
      userId: (req?.user as any)?._id,
    });
    const data = await comment.populate("userId", "name profilePicture");
    return res.status(SUCCESS.code).json({ ...SUCCESS, data: data });
  } catch (error) {
    const validationError = formattedYupErrors(error);
    return res.status(validationError.code).json({ ...validationError, error });
  }
};

/**
 * Delete comment related to post
 * @param req
 * @param res
 */
export const deleteComment = async (req: Request, res: Response) => {
  try {
    return res.status(SUCCESS.code).json({ ...SUCCESS });
  } catch (error) {
    return res.status(INTERNAL_ERROR.code).json({ ...INTERNAL_ERROR });
  }
};
