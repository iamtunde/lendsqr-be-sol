"use strict";
/** @format */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawMoneyValidation = exports.sendMoneyValidation = exports.findWalletByNubanValidation = exports.fundWalletValidation = void 0;
var joi_1 = __importDefault(require("joi"));
var validation_config_1 = require("./validation.config");
var request_validation_error_1 = require("../../errors/request-validation.error");
var schemaSetup = {
    amount: joi_1.default.number()
        .positive()
        .precision(2)
        .required()
        .strict(true)
        .messages({
        "number.positive": "Amount must be a positive number",
        "number.precision": "Amount must have at most two decimal places",
    }),
    nuban: joi_1.default.string().length(10).required().messages({
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
var fundWalletValidation = function (req, res, next) {
    var schema = joi_1.default.object().keys({
        amount: schemaSetup.amount,
        userId: joi_1.default.optional(),
    });
    var error = schema.validate(req.body, validation_config_1.validationConfig).error;
    if (error) {
        throw new request_validation_error_1.RequestValidationError(error);
    }
    next();
};
exports.fundWalletValidation = fundWalletValidation;
/**
 * @desc validation for route wallets/lookUp
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
var findWalletByNubanValidation = function (req, res, next) {
    var schema = joi_1.default.object().keys({
        nuban: schemaSetup.nuban,
        userId: joi_1.default.optional(),
    });
    var error = schema.validate(req.body, validation_config_1.validationConfig).error;
    if (error) {
        throw new request_validation_error_1.RequestValidationError(error);
    }
    next();
};
exports.findWalletByNubanValidation = findWalletByNubanValidation;
/**
 * @desc validation for route wallets/sendMoney
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
var sendMoneyValidation = function (req, res, next) {
    var schema = joi_1.default.object().keys(__assign(__assign({}, schemaSetup), { userId: joi_1.default.optional() }));
    var error = schema.validate(req.body, validation_config_1.validationConfig).error;
    if (error) {
        throw new request_validation_error_1.RequestValidationError(error);
    }
    next();
};
exports.sendMoneyValidation = sendMoneyValidation;
/**
 * @desc validation for route wallets/withdraw
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object or invokes the next middleware
 */
var withdrawMoneyValidation = function (req, res, next) {
    var schema = joi_1.default.object().keys({
        amount: schemaSetup.amount,
        userId: joi_1.default.optional(),
        accountNumber: joi_1.default.string().required(),
        accountName: joi_1.default.string().required(),
        bankName: joi_1.default.string().required(),
    });
    var error = schema.validate(req.body, validation_config_1.validationConfig).error;
    if (error) {
        throw new request_validation_error_1.RequestValidationError(error);
    }
    next();
};
exports.withdrawMoneyValidation = withdrawMoneyValidation;
//# sourceMappingURL=wallet.validation.js.map