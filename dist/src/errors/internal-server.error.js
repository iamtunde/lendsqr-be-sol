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
exports.InternalServerError = void 0;
var custom_error_1 = require("./custom.error");
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.statusCode = 500;
        // Only because we are extending a built in class
        Object.setPrototypeOf(_this, InternalServerError.prototype);
        return _this;
    }
    InternalServerError.prototype.serializeErrors = function () {
        return [{ message: this.message }];
    };
    return InternalServerError;
}(custom_error_1.CustomError));
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=internal-server.error.js.map