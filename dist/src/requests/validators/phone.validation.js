"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumberString = void 0;
var joi_1 = __importDefault(require("joi"));
var validation_config_1 = require("./validation.config");
var validatePhoneNumberString = function (req, res, next) {
    var schema = joi_1.default.object().keys({
        phone: joi_1.default.string()
            .pattern(/^\+\d{1,3}\s?\d{4,13}$/)
            .messages({
            "string.pattern.base": "Phone number must include the country dial code and follow the format: +<country code> <number>",
        }),
    });
    var error = schema.validate(req.params, validation_config_1.validationConfig).error;
    if (error)
        throw error;
    next();
};
exports.validatePhoneNumberString = validatePhoneNumberString;
//# sourceMappingURL=phone.validation.js.map