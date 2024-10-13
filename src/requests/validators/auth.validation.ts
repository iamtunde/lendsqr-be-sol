/** @format */

import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validationConfig } from "./validation.config";
import { RequestValidationError } from "../../errors/request-validation.error";

/**
 * @desc validation for route auth/sign-up
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const signUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const string_validation = Joi.string().required();

  const schema = Joi.object().keys({
    firstName: string_validation.messages({
      "string.base": "first name field should be a string",
      "string.empty": "first name field is not allowed to be empty",
      "any.required": "first name field is required",
    }),
    lastName: string_validation.messages({
      "string.base": "last name field should be a string",
      "string.empty": "last name field is not allowed to be empty",
      "any.required": "last name field is required",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
    phone: Joi.string()
      .pattern(/^\+\d{1,3}\s?\d{4,13}$/)
      .messages({
        "string.pattern.base":
          "Phone number must include the country dial code and follow the format: +<country code><number>",
      }),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, validationConfig);

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};

/**
 * @desc validation for route auth/sign-in
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const signInValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, validationConfig);

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};
