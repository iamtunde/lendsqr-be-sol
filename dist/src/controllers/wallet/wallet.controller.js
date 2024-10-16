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
exports.WalletController = void 0;
var response_api_1 = require("../../utils/response.api");
var wallet_service_1 = require("./wallet.service");
var WalletController = /** @class */ (function () {
    function WalletController() {
    }
    /**
     * @desc fund a users' wallet
     * @access Public
     * @route POST /wallets
     * @param {Request} req http request
     * @param {Response} res http response
     * @param {NextFunction} next next function for error handling
     * @returns a transaction record object
     */
    WalletController.fundUserWallet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = req.body;
                        return [4 /*yield*/, wallet_service_1.WalletService.fundUserWallet(payload)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, response_api_1.success)(res, "Wallet successfully funded.", data, 200)];
                    case 2:
                        err_1 = _a.sent();
                        next(err_1); // Pass the error to the centralized error handler
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @desc find a users' wallet
     * @access Public
     * @route POST /wallets
     * @param {Request} req http request
     * @param {Response} res http response
     * @param {NextFunction} next next function for error handling
     * @returns an authenticated user wallet object
     */
    WalletController.findUserWallet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, wallet_service_1.WalletService.findUserWalletBalance(+req.body.userId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, response_api_1.success)(res, "Wallet successfully retrieved.", data, 200)];
                    case 2:
                        err_2 = _a.sent();
                        next(err_2); // Pass the error to the centralized error handler
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @desc look up account number
     * @access Public
     * @route PATCH /wallets/lookUp
     * @param {Request} req http request
     * @param {Response} res http response
     * @param {NextFunction} next next function for error handling
     * @returns lookUp response
     */
    WalletController.lookUpWalletNuban = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = req.body;
                        console.log({ payload: payload });
                        return [4 /*yield*/, wallet_service_1.WalletService.findWallet(payload)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, response_api_1.success)(res, "Account look-up successful.", data, 200)];
                    case 2:
                        err_3 = _a.sent();
                        next(err_3); // Pass the error to the centralized error handler
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @desc sends money to user on platform
     * @access Public
     * @route POST /wallets/sendMoney
     * @param {Request} req http request
     * @param {Response} res http response
     * @param {NextFunction} next next function for error handling
     * @returns lookUp response
     */
    WalletController.sendMoney = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = req.body;
                        return [4 /*yield*/, wallet_service_1.WalletService.sendMoney(payload)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, response_api_1.success)(res, "Transaction successful.", data, 200)];
                    case 2:
                        err_4 = _a.sent();
                        next(err_4); // Pass the error to the centralized error handler
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @desc withdraws money from a user's wallet
     * @access Public
     * @route POST /wallets/withdraw
     * @param {Request} req http request
     * @param {Response} res http response
     * @param {NextFunction} next next function for error handling
     * @returns lookUp response
     */
    WalletController.withdrawMoney = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = req.body;
                        return [4 /*yield*/, wallet_service_1.WalletService.withdrawMoney(payload)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, response_api_1.success)(res, "Transaction successful.", data, 200)];
                    case 2:
                        err_5 = _a.sent();
                        next(err_5); // Pass the error to the centralized error handler
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return WalletController;
}());
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map