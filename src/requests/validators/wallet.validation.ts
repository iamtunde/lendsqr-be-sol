/** @format */

import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validationConfig } from "./validation.config";
import { RequestValidationError } from "../../errors/request-validation.error";

const schemaSetup = {
  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .strict(true)
    .messages({
      "number.positive": "Amount must be a positive number",
      "number.precision": "Amount must have at most two decimal places",
    }),

  nuban: Joi.string().length(10).required().messages({
    "number.length": "Nuban must be exactly ten characters.",
    "any.required": "String is required",
  }),
};

/**
 * @desc validation for route wallets
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const fundWalletValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    amount: schemaSetup.amount,
    userId: Joi.optional(),
  });

  const { error } = schema.validate(req.body, validationConfig);

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};

/**
 * @desc validation for route wallets/lookUp
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const findWalletByNubanValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    nuban: schemaSetup.nuban,
    userId: Joi.optional(),
  });

  const { error } = schema.validate(req.body, validationConfig);

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};

/**
 * @desc validation for route wallets/sendMoney
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const sendMoneyValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({ ...schemaSetup, userId: Joi.optional() });

  const { error } = schema.validate(req.body, validationConfig);

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};

/**
 * @desc validation for route wallets/withdraw
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
export const withdrawMoneyValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    amount: schemaSetup.amount,
    userId: Joi.optional(),
    accountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    bankName: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, validationConfig);

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};
