/** @format */

import Joi from "joi";
import { validation_options } from "../../utils/validation.options";
import { RequestValidationError } from "../../errors";
import { Request, Response, NextFunction } from "express";

export const createGroupSubscriptionValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    plans: Joi.array().items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.base": "plan name field should be a string",
          "string.empty": "plan name field is not allowed to be empty",
          "any.required": "plan name field is required",
        }),
        price: Joi.number().required().messages({
          "string.base": "price field should be a number",
          "string.empty": "price field is not allowed to be empty",
          "any.required": "price field is required",
        }),
      }),
    ),
    currency: Joi.string().valid(["ngn", "usd"]).required(),
    collect_email: Joi.boolean().default(false),
  });

  const { error } = schema.validate(req.body, validation_options);

  if (error) throw new RequestValidationError(error.details);

  next();
};
