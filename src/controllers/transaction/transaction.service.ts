/** @format */

// src/controllers/transaction/transaction.service.ts

import { NotFoundError } from "../../errors";
import { TransactionModel } from "../../models/transaction.model";

export class TransactionService {
  static async getUserTransactions(userId: number) {
    try {
      const transactions = await TransactionModel.getUserTransactions(userId);

      return transactions;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getOneUserTransaction(reference: string) {
    try {
      const transaction = await TransactionModel.getOneTransaction(reference);

      if (!transaction) {
        throw new NotFoundError("Transation not found.");
      }

      return transaction;
    } catch (error) {
      throw new Error(error);
    }
  }
}
