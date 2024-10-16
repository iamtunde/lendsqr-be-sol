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
exports.WalletService = void 0;
// src/controllers/wallet/wallet.service.ts
var errors_1 = require("../../errors");
var constant_1 = require("../../helpers/constant");
var transaction_model_1 = require("../../models/transaction.model");
var user_model_1 = require("../../models/user.model");
var wallet_model_1 = require("../../models/wallet.model");
var random_strings_1 = require("../../utils/random.strings");
var emitter_1 = require("../../events/emitter");
var WalletService = /** @class */ (function () {
    function WalletService() {
    }
    WalletService.walletLookup = function (nuban, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wallet_model_1.WalletModel.findWalletByNuban(nuban)];
                    case 1:
                        wallet = _a.sent();
                        if (!wallet) {
                            throw new errors_1.BadRequestError("Unable to verify account number.");
                        }
                        if (wallet.userId === userId) {
                            throw new errors_1.BadRequestError("Cannot credit self.");
                        }
                        return [2 /*return*/, wallet];
                }
            });
        });
    };
    WalletService.fundUserWallet = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var dbTransaction, userWallet, reference, newBalance, transactionId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wallet_model_1.WalletModel.startDBTransaction()];
                    case 1:
                        dbTransaction = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 10]);
                        return [4 /*yield*/, wallet_model_1.WalletModel.findUserWallet(payload.userId)];
                    case 3:
                        userWallet = _a.sent();
                        if (!userWallet) {
                            throw new errors_1.BadRequestError("User wallet not found.");
                        }
                        reference = (0, random_strings_1.generateRandomString)(20);
                        newBalance = +userWallet.currentBalance + +payload.amount.toFixed(2);
                        return [4 /*yield*/, transaction_model_1.TransactionModel.createTransactionEntry(__assign(__assign({}, payload), { amount: +payload.amount.toFixed(2), reference: reference, status: constant_1.TRANSACTION_STATUS.PROCESSING, type: constant_1.TRANSACTION_TYPES.CREDIT, message: constant_1.TRANSACTION_MESSAGES.FUND }), dbTransaction)];
                    case 4:
                        transactionId = _a.sent();
                        return [4 /*yield*/, wallet_model_1.WalletModel.updateOneWallet(userWallet.id, {
                                currentBalance: newBalance,
                                previousBalance: userWallet.currentBalance,
                            }, dbTransaction)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, dbTransaction.commit()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, transaction_model_1.TransactionModel.updateOneTransaction(transactionId.id, {
                                status: constant_1.TRANSACTION_STATUS.SUCCESSFUL,
                            })];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, transaction_model_1.TransactionModel.getOneTransaction(reference)];
                    case 8:
                        error_1 = _a.sent();
                        return [4 /*yield*/, dbTransaction.rollback()];
                    case 9:
                        _a.sent();
                        throw error_1;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    WalletService.findWallet = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, _a, firstName, lastName, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.walletLookup(payload.nuban, payload.userId)];
                    case 1:
                        wallet = _b.sent();
                        return [4 /*yield*/, user_model_1.UserModel.findUserById(wallet.userId)];
                    case 2:
                        _a = _b.sent(), firstName = _a.firstName, lastName = _a.lastName;
                        return [2 /*return*/, {
                                firstName: firstName,
                                lastName: lastName,
                                nuban: wallet.nuban,
                            }];
                    case 3:
                        error_2 = _b.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WalletService.findUserWalletBalance = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, wallet_model_1.WalletModel.findUserWallet(userId)];
                    case 1:
                        wallet = _a.sent();
                        if (!wallet) {
                            return [2 /*return*/, { error: true, message: "Wallet not found for user." }];
                        }
                        return [2 /*return*/, wallet];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, { error: true, message: error_3 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalletService.sendMoney = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var dbTransaction, recipientWallet, senderWallet, transactionRef, newRecipientBalance, newSenderBalance, _a, w1, w2, t1, t2, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, wallet_model_1.WalletModel.startDBTransaction()];
                    case 1:
                        dbTransaction = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, , 10]);
                        return [4 /*yield*/, this.walletLookup(payload.nuban, payload.userId)];
                    case 3:
                        recipientWallet = _b.sent();
                        return [4 /*yield*/, this.findUserWalletBalance(payload.userId)];
                    case 4:
                        senderWallet = _b.sent();
                        if (senderWallet.error)
                            return [2 /*return*/];
                        if (senderWallet.currentBalance < payload.amount) {
                            throw new errors_1.BadRequestError("Insufficient wallet balance");
                        }
                        transactionRef = (0, random_strings_1.generateRandomString)(20);
                        newRecipientBalance = +recipientWallet.currentBalance + +payload.amount.toFixed(2);
                        newSenderBalance = +senderWallet.currentBalance - +payload.amount.toFixed(2);
                        return [4 /*yield*/, Promise.all([
                                wallet_model_1.WalletModel.updateOneWallet(senderWallet.id, {
                                    currentBalance: newSenderBalance,
                                    previousBalance: senderWallet.currentBalance,
                                }, dbTransaction),
                                wallet_model_1.WalletModel.updateOneWallet(recipientWallet.id, {
                                    currentBalance: newRecipientBalance,
                                    previousBalance: recipientWallet.currentBalance,
                                }, dbTransaction),
                                transaction_model_1.TransactionModel.createTransactionEntry({
                                    userId: senderWallet.userId,
                                    amount: +payload.amount.toFixed(2),
                                    reference: transactionRef,
                                    status: constant_1.TRANSACTION_STATUS.PROCESSING,
                                    type: constant_1.TRANSACTION_TYPES.DEBIT,
                                    message: constant_1.TRANSACTION_MESSAGES.DEBIT,
                                }, dbTransaction),
                                transaction_model_1.TransactionModel.createTransactionEntry({
                                    userId: recipientWallet.userId,
                                    amount: +payload.amount.toFixed(2),
                                    reference: "".concat(transactionRef, "/RCVD"),
                                    status: constant_1.TRANSACTION_STATUS.PROCESSING,
                                    type: constant_1.TRANSACTION_TYPES.CREDIT,
                                    message: constant_1.TRANSACTION_MESSAGES.FUND,
                                }, dbTransaction),
                            ])];
                    case 5:
                        _a = _b.sent(), w1 = _a[0], w2 = _a[1], t1 = _a[2], t2 = _a[3];
                        return [4 /*yield*/, dbTransaction.commit()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                transaction_model_1.TransactionModel.updateOneTransaction(t1.id, {
                                    status: constant_1.TRANSACTION_STATUS.SUCCESSFUL,
                                }),
                                transaction_model_1.TransactionModel.updateOneTransaction(t2.id, {
                                    status: constant_1.TRANSACTION_STATUS.SUCCESSFUL,
                                }),
                            ])];
                    case 7:
                        _b.sent();
                        emitter_1.emitter.emit(constant_1.EVENT_TYPES.LOG_TRANSACTION, {
                            amount: payload.amount,
                            userId: payload.userId,
                        });
                        return [2 /*return*/, transaction_model_1.TransactionModel.getOneTransaction(transactionRef)];
                    case 8:
                        error_4 = _b.sent();
                        return [4 /*yield*/, dbTransaction.rollback()];
                    case 9:
                        _b.sent();
                        throw error_4;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    WalletService.withdrawMoney = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var dbTransaction, userWallet, newBalance, message, reference, _a, _, transaction, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.startDBTransaction()];
                    case 1:
                        dbTransaction = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, , 10]);
                        return [4 /*yield*/, this.findUserWalletBalance(payload.userId)];
                    case 3:
                        userWallet = _b.sent();
                        if (userWallet.currentBalance < payload.amount) {
                            throw new errors_1.BadRequestError("Insufficient wallet balance");
                        }
                        newBalance = +userWallet.currentBalance - +payload.amount.toFixed(2);
                        message = "Withdraw ".concat(payload.amount, " to ").concat(payload.accountNumber, " | ").concat(payload.accountName, " | ").concat(payload.bankName);
                        reference = (0, random_strings_1.generateRandomString)(20);
                        return [4 /*yield*/, Promise.all([
                                wallet_model_1.WalletModel.updateOneWallet(userWallet.id, {
                                    currentBalance: newBalance,
                                    previousBalance: userWallet.currentBalance,
                                }, dbTransaction),
                                transaction_model_1.TransactionModel.createTransactionEntry({
                                    userId: userWallet.userId,
                                    amount: +payload.amount.toFixed(2),
                                    reference: reference,
                                    status: constant_1.TRANSACTION_STATUS.PROCESSING,
                                    type: constant_1.TRANSACTION_TYPES.DEBIT,
                                    message: message,
                                }, dbTransaction),
                            ])];
                    case 4:
                        _a = _b.sent(), _ = _a[0], transaction = _a[1];
                        return [4 /*yield*/, dbTransaction.commit()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, transaction_model_1.TransactionModel.updateOneTransaction(transaction.id, {
                                status: constant_1.TRANSACTION_STATUS.SUCCESSFUL,
                            })];
                    case 6:
                        _b.sent();
                        emitter_1.emitter.emit(constant_1.EVENT_TYPES.LOG_TRANSACTION, {
                            amount: payload.amount,
                            userId: payload.userId,
                        });
                        return [4 /*yield*/, transaction_model_1.TransactionModel.getOneTransaction(reference)];
                    case 7: return [2 /*return*/, _b.sent()];
                    case 8:
                        error_5 = _b.sent();
                        return [4 /*yield*/, dbTransaction.rollback()];
                    case 9:
                        _b.sent();
                        throw error_5;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return WalletService;
}());
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map