import { UNAUTHORIZED } from "@constants";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RevokedToken } from "@models";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

/**
 * Middleware function to handle authentication-related requests.
 *
 * @param req  - The HTTP request object.
 * @param res  - The HTTP response object.
 * @param next - The next function from Http.
 * @returns A JSON response with the appropriate status and data.
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }
  const token: string = authHeader.split("Bearer ")[1] || "";

  const isTokenExists = await RevokedToken.findOne({ token: token });

  if (isTokenExists) {
    return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded as string | jwt.JwtPayload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }
};
