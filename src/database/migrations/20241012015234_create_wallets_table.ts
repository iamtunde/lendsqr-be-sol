/** @format */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("wallets", (table) => {
    table.increments("id").primary().unique();
    table.integer("userId").unsigned().notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.decimal("currentBalance", 15, 2).defaultTo(0.0);
    table.decimal("previousBalance", 15, 2).defaultTo(0.0);
    table.string("nuban", 10).notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("wallets");
}
