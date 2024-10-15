/** @format */

import { emitter } from "../emitter";
import { EVENT_TYPES } from "../../helpers/constant";
import { TransactionService } from "../../controllers/transaction/transaction.service";

const transactionTrackerHandler = async (payload: {
  userId: number;
  amount: number;
}) => {
  await TransactionService.logDailyTransaction(payload);

  return true;
};

emitter.on(EVENT_TYPES.LOG_TRANSACTION, transactionTrackerHandler);
