/** @format */

import express from "express";
import {
  findUserWallet,
  fundUserWallet,
  lookUpWalletNuban,
  sendMoney,
  withdrawMoney,
} from "../controllers/wallet/wallet.controller";
import {
  fundWalletValidation,
  findWalletByNubanValidation,
  sendMoneyValidation,
  withdrawMoneyValidation,
} from "../requests/validators";
import { jwtMiddleware } from "../requests/middleware";

const route = express.Router();

route.get("/", jwtMiddleware, findUserWallet);
route.post("/", [jwtMiddleware, fundWalletValidation], fundUserWallet);
route.post("/sendMoney", [jwtMiddleware, sendMoneyValidation], sendMoney);
route.post(
  "/withdraw",
  [jwtMiddleware, withdrawMoneyValidation],
  withdrawMoney,
);
route.patch(
  "/lookUp",
  [jwtMiddleware, findWalletByNubanValidation],
  lookUpWalletNuban,
);

export { route as Wallet };
