/** @format */

// src/controllers/wallet/wallet.service.ts
import { BadRequestError, CustomError } from "../../errors";
import {
  TRANSACTION_MESSAGES,
  TRANSACTION_STATUS,
  TRANSACTION_TYPES,
} from "../../helpers/constant";
import { TransactionModel } from "../../models/transaction.model";
import { UserModel } from "../../models/user.model";
import { WalletModel } from "../../models/wallet.model";
import { generateRandomString } from "../../utils/random.strings";
import {
  IFindWallet,
  IFundWallet,
  ISendMoney,
  IWithdrawMoney,
} from "./wallet.interface";

export class WalletService {
  protected static async walletLookup(nuban: string, userId: number) {
    const wallet = await WalletModel.findWalletByNuban(nuban);

    if (!wallet) {
      throw new BadRequestError("Unable to verify account number.");
    }

    if (wallet.userId === userId) {
      throw new BadRequestError("Cannot credit self.");
    }

    return wallet;
  }

  static async fundUserWallet(payload: IFundWallet) {
    const dbTransaction = await WalletModel.startDBTransaction();

    try {
      const userWallet = await WalletModel.findUserWallet(payload.userId);

      if (!userWallet) {
        throw new BadRequestError("User wallet not found.");
      }
      const reference = generateRandomString(20);

      const newBalance =
        +userWallet.currentBalance + +payload.amount.toFixed(2);

      // Create transaction record in database and get the id
      const transactionId = await TransactionModel.createTransactionEntry(
        {
          ...payload,
          amount: +payload.amount.toFixed(2),
          reference,
          status: TRANSACTION_STATUS.PROCESSING,
          type: TRANSACTION_TYPES.CREDIT,
          message: TRANSACTION_MESSAGES.FUND,
        },
        dbTransaction,
      );

      await WalletModel.updateOneWallet(
        userWallet.id,
        {
          currentBalance: newBalance,
          previousBalance: userWallet.currentBalance,
        },
        dbTransaction,
      );

      await dbTransaction.commit();

      await TransactionModel.updateOneTransaction(transactionId.id, {
        status: TRANSACTION_STATUS.SUCCESSFUL,
      });

      return TransactionModel.getOneTransaction(reference);
    } catch (error) {
      await dbTransaction.rollback();
      throw error;
    }
  }

  static async findWallet(payload: IFindWallet) {
    try {
      const wallet = await this.walletLookup(payload.nuban, payload.userId);

      const { firstName, lastName } = await UserModel.findUserById(
        wallet.userId,
      );

      return {
        firstName,
        lastName,
        nuban: wallet.nuban,
      };
    } catch (error) {
      throw error;
    }
  }

  static async findUserWalletBalance(userId: number): Promise<any> {
    try {
      const wallet = await WalletModel.findUserWallet(userId);

      if (!wallet) {
        return { error: true, message: "Wallet not found for user." };
      }

      return wallet;
    } catch (error) {
      return { error: true, message: error };
    }
  }

  static async sendMoney(payload: ISendMoney) {
    // Starts DB transaction
    const dbTransaction = await WalletModel.startDBTransaction();

    try {
      const recipientWallet = await this.walletLookup(
        payload.nuban,
        payload.userId,
      );

      const senderWallet = await this.findUserWalletBalance(payload.userId);

      if (senderWallet.error) return;
      if (senderWallet.currentBalance < payload.amount) {
        throw new BadRequestError("Insufficient wallet balance");
      }
      const transactionRef = generateRandomString(20);

      const newRecipientBalance =
        +recipientWallet.currentBalance + +payload.amount.toFixed(2);
      const newSenderBalance =
        +senderWallet.currentBalance - +payload.amount.toFixed(2);

      const [w1, w2, t1, t2] = await Promise.all([
        WalletModel.updateOneWallet(
          senderWallet.id,
          {
            currentBalance: newSenderBalance,
            previousBalance: senderWallet.currentBalance,
          },
          dbTransaction,
        ),

        WalletModel.updateOneWallet(
          recipientWallet.id,
          {
            currentBalance: newRecipientBalance,
            previousBalance: recipientWallet.currentBalance,
          },
          dbTransaction,
        ),

        TransactionModel.createTransactionEntry(
          {
            userId: senderWallet.userId,
            amount: +payload.amount.toFixed(2),
            reference: transactionRef,
            status: TRANSACTION_STATUS.PROCESSING,
            type: TRANSACTION_TYPES.DEBIT,
            message: TRANSACTION_MESSAGES.DEBIT,
          },
          dbTransaction,
        ),

        TransactionModel.createTransactionEntry(
          {
            userId: recipientWallet.userId,
            amount: +payload.amount.toFixed(2),
            reference: `${transactionRef}/RCVD`,
            status: TRANSACTION_STATUS.PROCESSING,
            type: TRANSACTION_TYPES.CREDIT,
            message: TRANSACTION_MESSAGES.FUND,
          },
          dbTransaction,
        ),
      ]);

      await dbTransaction.commit();

      await Promise.all([
        TransactionModel.updateOneTransaction(t1.id, {
          status: TRANSACTION_STATUS.SUCCESSFUL,
        }),
        TransactionModel.updateOneTransaction(t2.id, {
          status: TRANSACTION_STATUS.SUCCESSFUL,
        }),
      ]);

      return TransactionModel.getOneTransaction(transactionRef);
    } catch (error) {
      await dbTransaction.rollback();

      throw error;
    }
  }

  static async withdrawMoney(payload: IWithdrawMoney) {
    // Starts DB transaction
    const dbTransaction = await UserModel.startDBTransaction();

    try {
      const userWallet = await this.findUserWalletBalance(payload.userId);

      if (userWallet.currentBalance < payload.amount) {
        throw new BadRequestError("Insufficient wallet balance");
      }

      const newBalance =
        +userWallet.currentBalance - +payload.amount.toFixed(2);
      const message = `Withdraw ${payload.amount} to ${payload.accountNumber} | ${payload.accountName} | ${payload.bankName}`;
      const reference = generateRandomString(20);

      const [_, transaction] = await Promise.all([
        WalletModel.updateOneWallet(
          userWallet.id,
          {
            currentBalance: newBalance,
            previousBalance: userWallet.currentBalance,
          },
          dbTransaction,
        ),
        TransactionModel.createTransactionEntry(
          {
            userId: userWallet.userId,
            amount: +payload.amount.toFixed(2),
            reference,
            status: TRANSACTION_STATUS.PROCESSING,
            type: TRANSACTION_TYPES.DEBIT,
            message,
          },
          dbTransaction,
        ),
      ]);

      await dbTransaction.commit();

      await TransactionModel.updateOneTransaction(transaction.id, {
        status: TRANSACTION_STATUS.SUCCESSFUL,
      });

      return await TransactionModel.getOneTransaction(reference);
    } catch (error) {
      await dbTransaction.rollback();

      throw error;
    }
  }
}
