/** @format */

import { BadRequestError } from "../../errors";
import { TransactionService } from "../../controllers/transaction/transaction.service";
import { Request, Response, NextFunction } from "express";
import { isTimeExpired } from "../../utils/date.time";
import { DAILY_TRANSACTION_LIMIT } from "../../helpers/constant";

export const transactionLimitChecker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, amount } = req.body;
    let reset: boolean = false;

    const transactionTracker =
      await TransactionService.getUserDailyTransactionLimit(userId);

    if (!transactionTracker) {
      next();
    }

    const limitExpired = isTimeExpired(transactionTracker.limitExpiry);

    if (limitExpired) {
      await TransactionService.resetUserDailyTransactionLimit(
        transactionTracker.id,
      );
      const transactionAmount = +parseFloat(amount).toFixed(2);

      if (transactionAmount > DAILY_TRANSACTION_LIMIT) {
        throw new BadRequestError(
          "Transaction amount is above daily transaction limit.",
        );
      }
    } else if (transactionTracker.totalAmount == DAILY_TRANSACTION_LIMIT) {
      throw new BadRequestError(
        "You have reached your daily transaction limit.",
      );
    } else {
      const newTransactionVolume =
        +parseFloat(amount).toFixed(2) + +transactionTracker.totalAmount;

      if (newTransactionVolume > DAILY_TRANSACTION_LIMIT) {
        throw new BadRequestError(
          "Transaction amount is above daily transaction limit.",
        );
      }
    }
  } catch (error) {
    next(error);
  }

  next();
};
