/** @format */

// src/middleware/error-handler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../errors";
import { error } from "../../utils/response.api";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If the error is an instance of CustomError, handle it
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  return error(res, "Something went wrong.", 500);
};
