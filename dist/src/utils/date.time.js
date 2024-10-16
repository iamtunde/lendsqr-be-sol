"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimeExpired = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var isTimeExpired = function (expiryDate, currentDate) {
    if (currentDate === void 0) { currentDate = null; }
    var now = currentDate ? (0, dayjs_1.default)(currentDate) : (0, dayjs_1.default)();
    var expiration = (0, dayjs_1.default)(expiryDate);
    return expiration.isBefore(now, "day");
};
exports.isTimeExpired = isTimeExpired;
//# sourceMappingURL=date.time.js.map