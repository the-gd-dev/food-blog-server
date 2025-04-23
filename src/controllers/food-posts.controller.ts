import { INTERNAL_ERROR, SUCCESS } from "@constants";
import { FoodPost } from "@models";
import { createFoodPostSchema, formattedYupErrors } from "@utils";
import { Request, Response } from "express";

/**
 * get all Food Posts
 * @param req
 * @param res
 * @returns
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const allFoodPosts = await FoodPost.find({}, "-__v").populate(
      "postedBy",
      "name profilePicture"
    );
    return res
      .status(SUCCESS.code)
      .json({ ...SUCCESS, food_posts: allFoodPosts.map((f) => f.toObject()) });
  } catch (error) {
    return res.status(INTERNAL_ERROR.code).json({ ...INTERNAL_ERROR });
  }
};

/**
 * Create Food Post
 * @paramq * @param res
 * @returns
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    await createFoodPostSchema.validate(req.body, { abortEarly: false });
    const newPost = await FoodPost.create({
      ...req.body,
      postedBy: (req?.user as any)?._id,
    });
    console.log("New Post", newPost);

    return res.status(SUCCESS.code).json({ ...SUCCESS });
  } catch (error) {
    const validationError = formattedYupErrors(error);
    return res.status(validationError.code).json({ ...validationError });
  }
};

/**
 * get Food Post
 * @param req
 * @param res
 * @returns
 */
export const getPost = async (req: Request, res: Response) => {
  return res.status(SUCCESS.code).json({ ...SUCCESS });
};

/**
 * Update Food Post
 * @param req
 * @param res
 * @returns
 */
export const updatePost = async (req: Request, res: Response) => {
  return res.status(SUCCESS.code).json({ ...SUCCESS });
};

/**
 * Delete Food Post
 * @param req
 * @param res
 * @returns
 */
export const deletePost = async (req: Request, res: Response) => {
  return res.status(SUCCESS.code).json({ ...SUCCESS });
};
