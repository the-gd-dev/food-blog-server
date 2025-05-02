import { INTERNAL_ERROR, NOT_FOUND, SUCCESS } from "@constants";
import { FoodPost } from "@models";
import {
  createFoodPostSchema,
  excludeKeysFromObject,
  formattedYupErrors,
} from "@utils";
import { Request, Response } from "express";

/**
 * get all Food Posts
 * @param req
 * @param res
 * @returns
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const allFoodPosts = await FoodPost.find({}, "-__v")
      .populate("postedBy", "name profilePicture")
      .populate("comments");
    return res
      .status(SUCCESS.code)
      .json({ ...SUCCESS, data: allFoodPosts.map((f) => f.toObject()) });
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
    const fileURL = req?.body?.imageUrl;

    const createPost = await FoodPost.create({
      ...excludeKeysFromObject(req.body, ["_id", "id"]),
      imageUrl: fileURL,
      postedBy: (req?.user as any)?._id.toString(),
    });

    const newPost = await createPost.populate(
      "postedBy",
      "name profilePicture"
    );

    return res.status(SUCCESS.code).json({
      ...SUCCESS,
      data: excludeKeysFromObject(newPost.toObject(), ["__v", "id"]),
    });
  } catch (error) {
    const validationError = formattedYupErrors(error);
    return res.status(validationError.code).json({ ...validationError, error });
  }
};

/**
 * get Food Post
 * @param req
 * @param res
 * @returns
 */
export const getPost = async (req: Request, res: Response) => {
  try {
    const foodPost = await FoodPost.findById(req.params.id)
      .populate("postedBy", "name profilePicture")
      .populate("comments");

    if (!foodPost) {
      return res
        .status(404)
        .json({ code: 404, message: "Food post not found" });
    }
    return res
      .status(SUCCESS.code)
      .json({ ...SUCCESS, data: foodPost.toObject() });
  } catch (error) {
    return res.status(INTERNAL_ERROR.code).json({ ...INTERNAL_ERROR });
  }
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
  try {
    const foodPost = await FoodPost.findById(req.params.id);
    if (!foodPost) {
      return res.status(NOT_FOUND.code).json({ ...NOT_FOUND });
    }
    await foodPost.deleteOne();
    return res.status(SUCCESS.code).json({ ...SUCCESS });
  } catch (error) {
    return res.status(INTERNAL_ERROR.code).json({ ...INTERNAL_ERROR });
  }
};

export const uploadFoodImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    return res.status(200).json({
      message: "File uploaded successfully!",
      data: { url: fileUrl },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
