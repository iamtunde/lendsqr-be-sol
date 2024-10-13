/** @format */

import express from "express";
import {
  getUserTransactions,
  getOneTransaction,
} from "../controllers/transaction/transaction.controller";
import { jwtMiddleware } from "../requests/middleware";

const route = express.Router();

route.get("/", jwtMiddleware, getUserTransactions);
route.get("/:reference", jwtMiddleware, getOneTransaction);

export { route as Transaction };
