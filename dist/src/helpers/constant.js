"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAILY_TRANSACTION_LIMIT = exports.EVENT_TYPES = exports.TRANSACTION_MESSAGES = exports.TRANSACTION_TYPES = exports.TRANSACTION_STATUS = exports.APP_ENVIRONMENT = void 0;
exports.APP_ENVIRONMENT = process.env.NODE_ENV || "development";
var TRANSACTION_STATUS;
(function (TRANSACTION_STATUS) {
    TRANSACTION_STATUS["FAILED"] = "failed";
    TRANSACTION_STATUS["PROCESSING"] = "processing";
    TRANSACTION_STATUS["SUCCESSFUL"] = "successful";
})(TRANSACTION_STATUS || (exports.TRANSACTION_STATUS = TRANSACTION_STATUS = {}));
var TRANSACTION_TYPES;
(function (TRANSACTION_TYPES) {
    TRANSACTION_TYPES["CREDIT"] = "credit";
    TRANSACTION_TYPES["DEBIT"] = "debit";
})(TRANSACTION_TYPES || (exports.TRANSACTION_TYPES = TRANSACTION_TYPES = {}));
var TRANSACTION_MESSAGES;
(function (TRANSACTION_MESSAGES) {
    TRANSACTION_MESSAGES["FUND"] = "wallet funded";
    TRANSACTION_MESSAGES["DEBIT"] = "wallet debited";
})(TRANSACTION_MESSAGES || (exports.TRANSACTION_MESSAGES = TRANSACTION_MESSAGES = {}));
var EVENT_TYPES;
(function (EVENT_TYPES) {
    EVENT_TYPES["LOG_TRANSACTION"] = "log-transaction";
})(EVENT_TYPES || (exports.EVENT_TYPES = EVENT_TYPES = {}));
exports.DAILY_TRANSACTION_LIMIT = 10000;
//# sourceMappingURL=constant.js.map