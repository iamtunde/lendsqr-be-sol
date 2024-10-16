"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
var success = function (res, message, data, status_code) {
    if (status_code === void 0) { status_code = 200; }
    return res.status(status_code).json({
        message: message,
        error: false,
        code: status_code,
        data: data,
    });
};
exports.success = success;
var error = function (res, message, status_code) {
    if (status_code === void 0) { status_code = 500; }
    return res.status(status_code).json({
        message: message,
        error: true,
        code: status_code,
        data: null,
    });
};
exports.error = error;
//# sourceMappingURL=response.api.js.map