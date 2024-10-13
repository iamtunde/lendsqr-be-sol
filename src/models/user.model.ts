/** @format */

import { Model } from ".";
import database from "../database/database.config";
import { Knex } from "knex";

interface UserPayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
}

interface User extends UserPayload {
  id?: number;
  level?: number;
  lastLogin?: string;
  isActive?: boolean;
  token?: string;
}

export class UserModel extends Model {
  protected static tableName = "users";

  public static async startDBTransaction(): Promise<Knex.Transaction> {
    return database.transaction();
  }

  public static async createUserEntry(
    payload: UserPayload,
    trx?: Knex.Transaction,
  ) {
    return this.insert(payload, trx);
  }

  public static async findUserByEmail(email: string): Promise<User | null> {
    return this.findOne<{ email: string }, User>({ email });
  }

  public static async findUserById(id: number): Promise<User | null> {
    return this.findOneById(id);
  }

  public static async updateOneUser(id: number, data: Partial<User>) {
    return this.update(id, data);
  }

  public static async isUniqueFields(params: {
    email?: string;
    phone?: string;
  }): Promise<boolean> {
    const entry = await this.findOne(params);

    if (entry) {
      return false;
    }

    return true;
  }
}
