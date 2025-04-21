import { Request, Response } from "express";
import { SUCCESS } from "@constants";

export const getUser = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

export const createUser = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};
