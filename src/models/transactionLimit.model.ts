/** @format */

import { Model } from ".";
import database from "../database/database.config";
import { Knex } from "knex";

interface TransactionLimitPayload {
  userId: number;
}

interface TransactionLimit extends TransactionLimitPayload {
  id: number;
  totalAmount?: number;
  limitExpiry?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class TransactionLimitModel extends Model {
  protected static tableName = "transactionLimits";

  public static async startDBTransaction(): Promise<Knex.Transaction> {
    return database.transaction();
  }

  public static async createTransactionLimitEntry(
    payload: TransactionLimitPayload,
    trx?: Knex.Transaction,
  ) {
    return this.insert(payload, trx);
  }

  public static async getUserLimit(
    userId: number,
    trx?: Knex.Transaction,
  ): Promise<TransactionLimit | null> {
    return this.findOne<
      { userId: number; trx?: Knex.Transaction },
      TransactionLimit
    >({ userId }, trx);
  }

  public static async updateOneTransactionLimit(
    id: any,
    data: Partial<TransactionLimit>,
    trx?: Knex.Transaction,
  ) {
    return this.update(id, data, trx);
  }
}
