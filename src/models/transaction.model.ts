/** @format */

import { Model } from ".";
import database from "../database/database.config";
import { Knex } from "knex";

interface TransactionPayload {
  userId: number;
  amount: number;
  type: string;
  reference: string;
  status: string;
  message: string;
}

interface Transaction extends TransactionPayload {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export class TransactionModel extends Model {
  protected static tableName = "transactions";

  public static async startDBTransaction(): Promise<Knex.Transaction> {
    return database.transaction();
  }

  public static async createTransactionEntry(
    payload: TransactionPayload,
    trx?: Knex.Transaction,
  ) {
    return this.insert(payload, trx);
  }

  public static async getUserTransactions(
    userId: number,
  ): Promise<Transaction[] | null> {
    console.log(userId);
    return this.findAll<{ userId: number }, Transaction>({ userId: userId });
  }

  public static async getOneTransaction(
    reference: string,
    trx?: Knex.Transaction,
  ): Promise<Transaction | null> {
    return this.findOne<
      { reference: string; trx?: Knex.Transaction },
      Transaction
    >({ reference }, trx);
  }

  public static async updateOneTransaction(
    id: any,
    data: Partial<Transaction>,
    trx?: Knex.Transaction,
  ) {
    return this.update(id, data, trx);
  }
}
