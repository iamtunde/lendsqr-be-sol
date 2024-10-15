/** @format */

import express from "express";
import { WalletController } from "../controllers/wallet/wallet.controller";
import {
  fundWalletValidation,
  findWalletByNubanValidation,
  sendMoneyValidation,
  withdrawMoneyValidation,
} from "../requests/validators";
import { jwtMiddleware } from "../requests/middleware";

const route = express.Router();

route.get("/", jwtMiddleware, WalletController.findUserWallet);
route.post(
  "/",
  [jwtMiddleware, fundWalletValidation],
  WalletController.fundUserWallet,
);
route.post(
  "/sendMoney",
  [jwtMiddleware, sendMoneyValidation],
  WalletController.sendMoney,
);
route.post(
  "/withdraw",
  [jwtMiddleware, withdrawMoneyValidation],
  WalletController.withdrawMoney,
);
route.patch(
  "/lookUp",
  [jwtMiddleware, findWalletByNubanValidation],
  WalletController.lookUpWalletNuban,
);

export { route as Wallet };
