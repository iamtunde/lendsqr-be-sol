/** @format */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary().unique();
    table.integer("userId").unsigned().notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.decimal("amount", 15, 2).notNullable();
    table.string("reference", 30).notNullable();
    table.string("message", 225).notNullable();
    table
      .enum("status", ["failed", "processing", "successful"])
      .defaultTo("processing");
    table.enum("type", ["credit", "debit"]).notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("transactions");
}
