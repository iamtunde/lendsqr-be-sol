/** @format */
import { Request, Response } from "express";
import { success } from "../../utils/response.api";
import { AuthService } from "./auth.service";

/**
 * @desc user sign up
 * @access Public
 * @route POST /auth/signUp
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns an authenticated user object
 */
export const signUp = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await AuthService.signUp(payload);

  return success(res, "User successfully registered.", data, 200);
};

/**
 * @desc user sign in
 * @access Public
 * @route POST /auth/signIn
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns an authenticated user object
 */
export const signIn = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await AuthService.signIn(payload);

  return success(res, "User successfully signed in.", data, 200);
};
