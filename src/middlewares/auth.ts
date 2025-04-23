import { UNAUTHORIZED } from "@constants";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RevokedToken, User } from "@models";
import { excludeKeysFromObject } from "@utils";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

const excludeKeys = ["password", "__v", "createdAt", "updatedAt"];

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

  if (isTokenExists) return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    const userData = await User.findOne({ email: decoded.email });

    //no user related to email id.
    if (!userData) return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);

    //set user data to request.
    req.user = excludeKeysFromObject(userData.toObject(), excludeKeys);

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED.code).json(UNAUTHORIZED);
  }
};
