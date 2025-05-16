import { Request, Response } from "express";
import { INTERNAL_ERROR, SUCCESS } from "@constants";
import { User } from "@models";

export const getUser = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

export const createUser = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate((req?.user as any)?._id.toString(), req.body);
    return res.status(SUCCESS.code).json({ ...SUCCESS, data: { ...req.body } });
  } catch (error) {
    return res.status(INTERNAL_ERROR.code).json({ ...INTERNAL_ERROR });
  }
};
