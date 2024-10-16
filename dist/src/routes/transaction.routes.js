"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var express_1 = __importDefault(require("express"));
var transaction_controller_1 = require("../controllers/transaction/transaction.controller");
var middleware_1 = require("../requests/middleware");
var route = express_1.default.Router();
exports.Transaction = route;
route.get("/", middleware_1.jwtMiddleware, transaction_controller_1.TransactionController.getUserTransactions);
route.get("/:reference", middleware_1.jwtMiddleware, transaction_controller_1.TransactionController.getOneTransaction);
//# sourceMappingURL=transaction.routes.js.map