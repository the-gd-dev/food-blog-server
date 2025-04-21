import { Request, Response } from "express";
import {
  SUCCESS,
  CREATED,
  BAD_REQUEST,
  AUTHORIZED,
  UNAUTHORIZED,
  INTERNAL_ERROR,
} from "@constants";
import jwt from "jsonwebtoken";
import { RevokedToken } from "@models";

/**
 * Handles user login requests.
 *
 * Validates the request body for email and password, generates a JWT token,
 * and returns it in the response.
 *
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns A JSON response with the appropriate status and token.
 */
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

/**
 * Handles user registration requests.
 *
 * Currently, this function returns a placeholder response.
 *
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns A JSON response with the appropriate status and data.
 */
export const register = async (req: Request, res: Response) => {
  try {
    res.status(CREATED.code).json({ ...CREATED, data: {} });
  } catch (error) {
    res.status(INTERNAL_ERROR.code).json({ ...INTERNAL_ERROR, error: error });
  }
};

/**
 * Handles forgot password requests.
 *
 * Currently, this function returns a placeholder response.
 *
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns A JSON response with the appropriate status and data.
 */
export const forgotPassword = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

/**
 * Handles change password requests.
 *
 * Currently, this function returns a placeholder response.
 *
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns A JSON response with the appropriate status and data.
 */
export const changePassword = async (req: Request, res: Response) => {
  res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
};

/**
 * Verifies the provided JWT token.
 *
 * Decodes the token and returns the decoded data if the token is valid.
 *
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns A JSON response with the appropriate status and decoded data.
 */
export const verify = async (req: Request, res: Response) => {
  const token: string = req.headers.authorization?.split(" ")[1] || "";
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
  res.status(AUTHORIZED.code).json({ ...AUTHORIZED, data: decoded });
};

/**
 * Handles user logout requests.
 *
 * Checks if the provided token exists and is valid. If the token is already revoked
 * or not provided, it returns an unauthorized response. Otherwise, it decodes the token
 * to calculate its time-to-live (TTL). If the token is still valid, it adds the token
 * to the revoked tokens list to prevent further use. Finally, it sends a success response
 * indicating the user has been logged out.
 *
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns A JSON response with the appropriate status and message.
 */
export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const isTokenExists = await RevokedToken.findOne({ token: token });
  if (!token || isTokenExists) {
    return res.status(UNAUTHORIZED.code).json({ ...UNAUTHORIZED });
  }

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
