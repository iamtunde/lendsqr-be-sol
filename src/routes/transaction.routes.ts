/** @format */

import express from "express";

import { TransactionController } from "../controllers/transaction/transaction.controller";
import { jwtMiddleware } from "../requests/middleware";

const route = express.Router();

route.get("/", jwtMiddleware, TransactionController.getUserTransactions);
route.get(
  "/:reference",
  jwtMiddleware,
  TransactionController.getOneTransaction,
);

export { route as Transaction };
