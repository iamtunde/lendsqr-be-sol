"use strict";
/** @format */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
var custom_error_1 = require("./custom.error");
var DatabaseConnectionError = /** @class */ (function (_super) {
    __extends(DatabaseConnectionError, _super);
    function DatabaseConnectionError(message, errCode) {
        if (errCode === void 0) { errCode = null; }
        var _this = _super.call(this, message) || this;
        _this.reason = "Error connecting to database";
        _this.message = message;
        _this.statusCode = 500;
        _this.errCode = errCode;
        // Only because we are extending a built in class
        Object.setPrototypeOf(_this, DatabaseConnectionError.prototype);
        return _this;
    }
    DatabaseConnectionError.prototype.serializeErrors = function () {
        if (this.errCode === "22P02") {
            return [{ message: "Invalid input syntax for id" }];
        }
        if (this.errCode === "23505") {
            return [{ message: "Duplicate value for a unique field" }];
        }
        return [{ message: this.message }];
    };
    return DatabaseConnectionError;
}(custom_error_1.CustomError));
exports.DatabaseConnectionError = DatabaseConnectionError;
//# sourceMappingURL=database-connection.error.js.map