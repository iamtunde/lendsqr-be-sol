/** @format */

import { Model } from ".";
import database from "../database/database.config";
import { Knex } from "knex";

interface WalletPayload {
  userId: number;
  nuban: string;
}

interface Wallet {
  id?: number;
  userId?: number;
  nuban?: string;
  currentBalance?: number;
  previousBalance?: number;
}

export class WalletModel extends Model {
  protected static tableName = "wallets";

  public static async startDBTransaction(): Promise<Knex.Transaction> {
    return database.transaction();
  }

  public static async createWalletEntry(
    payload: WalletPayload,
    trx?: Knex.Transaction,
  ): Promise<Wallet> {
    return this.insert(payload, trx);
  }

  public static async findUserWallet(userId: number): Promise<Wallet | null> {
    return this.findOne<{ userId: number }, Wallet>({ userId: userId });
  }

  public static async findWalletByNuban(
    nuban: string,
    trx?: Knex.Transaction,
  ): Promise<Wallet | null> {
    return this.findOne<{ nuban: string; trx?: Knex.Transaction }, Wallet>(
      { nuban },
      trx,
    );
  }

  public static async updateOneWallet(
    id: number,
    data: Partial<Wallet>,
    trx?: Knex.Transaction,
  ) {
    return this.update(id, data, trx);
  }
}
