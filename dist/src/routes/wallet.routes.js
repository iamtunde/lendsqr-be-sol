"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var express_1 = __importDefault(require("express"));
var wallet_controller_1 = require("../controllers/wallet/wallet.controller");
var validators_1 = require("../requests/validators");
var middleware_1 = require("../requests/middleware");
var route = express_1.default.Router();
exports.Wallet = route;
route.get("/", middleware_1.jwtMiddleware, wallet_controller_1.WalletController.findUserWallet);
route.post("/", [middleware_1.jwtMiddleware, validators_1.fundWalletValidation], wallet_controller_1.WalletController.fundUserWallet);
route.post("/sendMoney", [middleware_1.jwtMiddleware, validators_1.sendMoneyValidation, middleware_1.transactionLimitChecker], wallet_controller_1.WalletController.sendMoney);
route.post("/withdraw", [middleware_1.jwtMiddleware, validators_1.withdrawMoneyValidation, middleware_1.transactionLimitChecker], wallet_controller_1.WalletController.withdrawMoney);
route.patch("/lookUp", [middleware_1.jwtMiddleware, validators_1.findWalletByNubanValidation], wallet_controller_1.WalletController.lookUpWalletNuban);
//# sourceMappingURL=wallet.routes.js.map