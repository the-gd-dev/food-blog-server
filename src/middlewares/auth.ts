import { UNAUTHORIZED } from "@constants";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { RevokedToken } from "@models";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader && !authHeader?.startsWith("Bearer ")) {
    res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }
  const token: string = authHeader?.split(" ")[0] || "";

  const isTokenExists = await RevokedToken.findOne({ token: token });
  
  if (isTokenExists) {
    return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded as string | jwt.JwtPayload;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }
};
