import {
  AUTHORIZED,
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  SUCCESS,
  UNAUTHORIZED,
} from "@constants";
import { RevokedToken, User } from "@models";
import { formattedYupErrors, loginSchema, registerSchema } from "@utils";
import argon2 from "argon2";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const email = String(req?.body?.email) || "";
    const password = String(req?.body?.password) || "";

    const user = await User.findOne({ email });
    const USER_NOT_FOUND = "User details not matched!";

    // user details not found in db
    if (!user) {
      return res
        .status(NOT_FOUND.code)
        .json({ ...NOT_FOUND, message: USER_NOT_FOUND });
    }

    // password hash not matched!
    const isValidPass = await argon2.verify(user.password, password);
    if (!isValidPass) {
      return res
        .status(BAD_REQUEST.code)
        .json({ ...BAD_REQUEST, message: USER_NOT_FOUND });
    }

    return res.status(SUCCESS.code).json({ ...SUCCESS, data: {} });
  } catch (err: any) {
    const validation = formattedYupErrors(err);
    return res.status(validation.code).json(validation);
  }
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
    await registerSchema.validate(req.body, {
      abortEarly: false,
    });
    await User.create({
      ...req.body,
      password: await argon2.hash(req.body.password),
    });
    return res.status(CREATED.code).json({ ...CREATED, data: {} });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(BAD_REQUEST.code).json({
        ...BAD_REQUEST,
        errors: { email: ["Please use a different email address."] },
      });
    }
    const validation = formattedYupErrors(err);
    return res.status(validation.code).json(validation);
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
