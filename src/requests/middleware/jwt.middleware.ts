/** @format */

import { UnauthorizedError } from "../../errors";
import { decryptToken } from "../../controllers/auth/jwt.strategy";
import { Request, Response, NextFunction } from "express";

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError("Authorization not found in request header.");
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new UnauthorizedError("Authorization header is malformed.");
    }

    const decrypted = decryptToken(token);
    req.body.userId = decrypted["id"];

    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
