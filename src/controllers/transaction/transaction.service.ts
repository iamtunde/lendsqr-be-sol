/** @format */

// src/controllers/transaction/transaction.service.ts

import dayjs from "dayjs";
import { NotFoundError } from "../../errors";
import { TransactionModel } from "../../models/transaction.model";
import { TransactionLimitModel } from "../../models/transactionLimit.model";

export class TransactionService {
  static async getUserTransactions(userId: number) {
    try {
      const transactions = await TransactionModel.getUserTransactions(userId);

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  static async getOneUserTransaction(reference: string) {
    try {
      const transaction = await TransactionModel.getOneTransaction(reference);

      if (!transaction) {
        throw new NotFoundError("Transaction not found.");
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  static async logDailyTransaction(payload: {
    userId: number;
    amount: number;
  }): Promise<boolean> {
    try {
      let transactionLimitId: number;
      let currentAmount: number;

      const transactionLimit = await TransactionLimitModel.getUserLimit(
        payload.userId,
      );

      if (!transactionLimit) {
        const createTransactionLimit =
          await TransactionLimitModel.createTransactionLimitEntry({
            userId: payload.userId,
          });
        transactionLimitId = createTransactionLimit.id;
        currentAmount = 0;
      } else {
        transactionLimitId = transactionLimit.id;
        currentAmount = transactionLimit.totalAmount;
      }

      const newAmount = +currentAmount + Number(payload.amount);

      await TransactionLimitModel.updateOneTransactionLimit(
        transactionLimitId,
        {
          totalAmount: newAmount,
        },
      );

      return true;
    } catch (error) {
      throw `Failed to log daily transaction for user ${payload.userId}: ${error.message}`;
    }
  }

  static async getUserDailyTransactionLimit(userId: number) {
    try {
      const transactionLimit = await TransactionLimitModel.getUserLimit(userId);

      return transactionLimit;
    } catch (error) {
      throw error;
    }
  }

  static async resetUserDailyTransactionLimit(
    limitId: number,
  ): Promise<boolean> {
    try {
      await TransactionLimitModel.updateOneTransactionLimit(limitId, {
        totalAmount: 0,
        limitExpiry: dayjs().format("YYYY-MM-DD"),
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
