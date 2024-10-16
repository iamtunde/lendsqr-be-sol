"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errors_1 = require("../../errors");
var response_api_1 = require("../../utils/response.api");
var errorHandler = function (err, req, res, next) {
    // If the error is an instance of CustomError, handle it
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors(),
        });
    }
    return (0, response_api_1.error)(res, "Something went wrong.", 500);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.handler.js.map