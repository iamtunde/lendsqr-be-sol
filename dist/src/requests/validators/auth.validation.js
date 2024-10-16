"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidation = exports.signUpValidation = void 0;
var joi_1 = __importDefault(require("joi"));
var validation_config_1 = require("./validation.config");
/**
 * @desc validation for route auth/sign-up
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
var signUpValidation = function (req, res, next) {
    var string_validation = joi_1.default.string().required();
    var schema = joi_1.default.object().keys({
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
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
            .required(),
        phone: joi_1.default.string()
            .pattern(/^\+\d{1,3}\s?\d{4,13}$/)
            .messages({
            "string.pattern.base": "Phone number must include the country dial code and follow the format: +<country code><number>",
        }),
        password: joi_1.default.string().required(),
    });
    var error = schema.validate(req.body, validation_config_1.validationConfig).error;
    if (error) {
        throw error;
    }
    next();
};
exports.signUpValidation = signUpValidation;
/**
 * @desc validation for route auth/sign-in
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
var signInValidation = function (req, res, next) {
    var schema = joi_1.default.object().keys({
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
            .required(),
        password: joi_1.default.string().required(),
    });
    var error = schema.validate(req.body, validation_config_1.validationConfig).error;
    if (error) {
        throw error;
    }
    next();
};
exports.signInValidation = signInValidation;
//# sourceMappingURL=auth.validation.js.map