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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var sanitize_phone_1 = require("../../utils/sanitize.phone");
var user_model_1 = require("../../models/user.model");
var errors_1 = require("../../errors");
var hash_1 = require("../../utils/hash");
var dayjs_1 = __importDefault(require("dayjs"));
var jwt_strategy_1 = require("./jwt.strategy");
var wallet_model_1 = require("../../models/wallet.model");
var transactionLimit_model_1 = require("../../models/transactionLimit.model");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.signUp = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var dbTransaction, isEmailUnique, isPhoneUnique, _a, userId, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.startDBTransaction()];
                    case 1:
                        dbTransaction = _b.sent();
                        // Sanitize the phone number
                        payload.phone = (0, sanitize_phone_1.removePlusSign)(payload.phone);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 10, , 12]);
                        return [4 /*yield*/, user_model_1.UserModel.isUniqueFields({
                                email: payload.email,
                            })];
                    case 3:
                        isEmailUnique = _b.sent();
                        if (!isEmailUnique) {
                            throw new errors_1.BadRequestError("Email is already in use.");
                        }
                        return [4 /*yield*/, user_model_1.UserModel.isUniqueFields({
                                phone: payload.phone,
                            })];
                    case 4:
                        isPhoneUnique = _b.sent();
                        if (!isPhoneUnique) {
                            throw new errors_1.BadRequestError("Phone number is already in use.");
                        }
                        // Encrypt the user's password before storing
                        _a = payload;
                        return [4 /*yield*/, (0, hash_1.encrypt)(payload.password)];
                    case 5:
                        // Encrypt the user's password before storing
                        _a.password = _b.sent();
                        return [4 /*yield*/, user_model_1.UserModel.createUserEntry(payload, dbTransaction)];
                    case 6:
                        userId = (_b.sent()).id;
                        // Create the wallet and transaction limit entries in parallel
                        return [4 /*yield*/, Promise.all([
                                wallet_model_1.WalletModel.createWalletEntry({ userId: userId, nuban: (0, sanitize_phone_1.createNubanFromPhone)(payload.phone) }, dbTransaction),
                                transactionLimit_model_1.TransactionLimitModel.createTransactionLimitEntry({ userId: userId }, dbTransaction),
                            ])];
                    case 7:
                        // Create the wallet and transaction limit entries in parallel
                        _b.sent();
                        // Commit the transaction
                        return [4 /*yield*/, dbTransaction.commit()];
                    case 8:
                        // Commit the transaction
                        _b.sent();
                        return [4 /*yield*/, user_model_1.UserModel.findUserById(userId)];
                    case 9:
                        user = _b.sent();
                        delete user.password; // Make sure the password is not returned
                        return [2 /*return*/, user];
                    case 10:
                        error_1 = _b.sent();
                        // Rollback the transaction if an error occurs
                        return [4 /*yield*/, dbTransaction.rollback()];
                    case 11:
                        // Rollback the transaction if an error occurs
                        _b.sent();
                        throw error_1;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.signIn = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        email = payload.email, password = payload.password;
                        return [4 /*yield*/, user_model_1.UserModel.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new errors_1.UnauthorizedError("Incorrect login credentials.");
                        }
                        if (!(0, hash_1.verify)(user.password, password)) {
                            throw new errors_1.UnauthorizedError("Incorrect login credentials.");
                        }
                        if (!user.isActive) {
                            throw new errors_1.UnauthorizedError("Your account is inactive, kindly send a complaint to support@lendsqr.com");
                        }
                        delete user.password;
                        user.token = (0, jwt_strategy_1.signToken)({ id: user.id, email: user.email });
                        // Save last login
                        return [4 /*yield*/, user_model_1.UserModel.updateOneUser(user.id, {
                                lastLogin: (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss"),
                            })];
                    case 2:
                        // Save last login
                        _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map