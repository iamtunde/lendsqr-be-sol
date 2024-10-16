"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionLimitChecker = void 0;
var errors_1 = require("../../errors");
var transaction_service_1 = require("../../controllers/transaction/transaction.service");
var date_time_1 = require("../../utils/date.time");
var constant_1 = require("../../helpers/constant");
var transactionLimitChecker = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, amount, reset, transactionTracker, limitExpired, transactionAmount, newTransactionVolume, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, userId = _a.userId, amount = _a.amount;
                reset = false;
                return [4 /*yield*/, transaction_service_1.TransactionService.getUserDailyTransactionLimit(userId)];
            case 1:
                transactionTracker = _b.sent();
                if (!transactionTracker) {
                    next();
                }
                limitExpired = (0, date_time_1.isTimeExpired)(transactionTracker.limitExpiry);
                if (!limitExpired) return [3 /*break*/, 3];
                return [4 /*yield*/, transaction_service_1.TransactionService.resetUserDailyTransactionLimit(transactionTracker.id)];
            case 2:
                _b.sent();
                transactionAmount = +parseFloat(amount).toFixed(2);
                if (transactionAmount > constant_1.DAILY_TRANSACTION_LIMIT) {
                    throw new errors_1.BadRequestError("Transaction amount is above daily transaction limit.");
                }
                return [3 /*break*/, 4];
            case 3:
                if (transactionTracker.totalAmount == constant_1.DAILY_TRANSACTION_LIMIT) {
                    throw new errors_1.BadRequestError("You have reached your daily transaction limit.");
                }
                else {
                    newTransactionVolume = +parseFloat(amount).toFixed(2) + +transactionTracker.totalAmount;
                    if (newTransactionVolume > constant_1.DAILY_TRANSACTION_LIMIT) {
                        throw new errors_1.BadRequestError("Transaction amount is above daily transaction limit.");
                    }
                }
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6:
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.transactionLimitChecker = transactionLimitChecker;
//# sourceMappingURL=transaction.limit.middleware.js.map