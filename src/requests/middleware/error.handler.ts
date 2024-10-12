/** @format */

import { error } from "../../utils/response.api";
import { CustomError } from "../../errors/custom.error";
import { Request, Response } from "express";
/**
 * @desc error handler middleware
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object
 */
export const ErrorHandler = (err: any, req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return error(res, err.serializeErrors()[0].message, err.statusCode);
  }

  return error(
    res,
    "We have experienced a technical glitch whilst processing your request, kindly try again in a few seconds.",
    500,
  );
};
