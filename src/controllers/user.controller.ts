import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@constants";

export const getUser = async (req: Request, res: Response) => {
  res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: {} });
};

export const createUser = async (req: Request, res: Response) => {
  res.status(HTTP_STATUS_CODES.CREATED).json({ data: {} });
};
