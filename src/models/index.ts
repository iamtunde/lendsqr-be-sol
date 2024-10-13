/** @format */

import database from "../database/database.config";
import { Knex } from "knex";

export abstract class Model {
  protected static tableName?: string;

  private static get table() {
    if (!this.tableName)
      throw new Error("The table name must be defined for the model.");

    return database(this.tableName);
  }

  protected static async insert<Payload>(
    data: Payload,
    trx?: Knex.Transaction,
  ): Promise<{
    id: number;
  }> {
    const [id] = await (trx ? trx(this.tableName) : this.table).insert(data);

    return { id };
  }

  protected static async findOneById<Result>(id: number): Promise<Result> {
    return this.table.where("id", id).select("*").first();
  }

  protected static async findOne<Payload, Result>(
    params: Payload,
    trx?: Knex.Transaction,
  ): Promise<Result> {
    return (trx ? trx(this.tableName) : this.table)
      .where({ ...params })
      .select("*")
      .first();
  }

  protected static async findAll<Payload, Item>(
    params: Payload,
  ): Promise<Item[]> {
    return this.table
      .where({ ...params })
      .select("*")
      .orderBy("createdAt", "desc");
  }

  protected static async update<Payload, Result>(
    id: number,
    payload: Payload,
    trx?: Knex.Transaction,
  ): Promise<Result> {
    return (trx ? trx(this.tableName) : this.table)
      .where({ id: id })
      .update({ ...payload })
      .select("*");
  }
}
