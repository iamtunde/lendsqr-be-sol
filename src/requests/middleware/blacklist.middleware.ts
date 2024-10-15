/** @format */

import { BadRequestError } from "../../errors";
import { Adjutor } from "../../integrations/adjutor";
import { Request, Response, NextFunction } from "express";

export const checkBlackList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const identity = req.body.phone;

  if (!identity) {
    throw new BadRequestError(
      "Kindly provide a valid phone number to continue.",
    );
  }

  //Check karma black list.
  const checkBlackList = await Adjutor.karmaLookUp(identity);

  if (checkBlackList && checkBlackList.karma_identity) {
    throw new BadRequestError("Sign up failed.");
  } else {
    next();
  }
};
