import { Request, Response } from "express";
import {
  SUCCESS,
  CREATED,
  BAD_REQUEST,
  AUTHORIZED,
  UNAUTHORIZED,
} from "@constants";
import jwt from "jsonwebtoken";
import { RevokedToken } from "@models";

export const login = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(BAD_REQUEST.code).json(BAD_REQUEST);
  }
  const token = jwt.sign(
    { email: req.body.email },
    process.env.JWT_SECRET || "",
    { expiresIn: "30days" }
  );

  res.status(SUCCESS.code).json({ ...SUCCESS, token: token });
};

export const register = async (req: Request, res: Response) => {
  res.status(CREATED.code).json({ ...CREATED, data: {} });
};

export const forgotPassword = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

export const changePassword = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

export const verify = async (req: Request, res: Response) => {
  res.status(AUTHORIZED.code).json({ ...AUTHORIZED });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(UNAUTHORIZED.code).json({ ...UNAUTHORIZED });

  const decoded = jwt.decode(token) || { exp: 0 };
  const now = Math.floor(Date.now() / 1000);
  const ttl = (decoded as any)?.exp - now;

  if (ttl > 0) {
    await RevokedToken.create({
      userId: 1,
      token: token,
    });
  }

  res
    .status(SUCCESS.code)
    .json({ ...SUCCESS, message: "User logged out successfully!" });
};
