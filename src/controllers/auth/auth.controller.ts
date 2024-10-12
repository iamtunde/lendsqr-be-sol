/** @format */
import { Request, Response } from "express";
import { success } from "../../utils/response.api";
import { AsyncHandler } from "../../requests/middleware";
import { AuthService } from "./auth.service";

export const getSignInQRCodeImage = async (req: Request, res: Response) => {
  const image = null;

  return success(res, "Successfully retrieved qr image.", image, 200);
};

export const getSignInCode = AsyncHandler(
  async (req: Request, res: Response) => {
    const code = null;

    return success(res, "Successfully retrieved sign up code.", code, 200);
  },
);
