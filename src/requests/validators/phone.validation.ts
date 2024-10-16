/** @format */

import Joi from "joi";
import { validationConfig } from "./validation.config";
import { RequestValidationError } from "../../errors";
import { Request, Response, NextFunction } from "express";

export const validatePhoneNumberString = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    phone: Joi.string()
      .pattern(/^\+\d{1,3}\s?\d{4,13}$/)
      .messages({
        "string.pattern.base":
          "Phone number must include the country dial code and follow the format: +<country code> <number>",
      }),
  });

  const { error } = schema.validate(req.params, validationConfig);

  if (error) throw error;

  next();
};
