/** @format */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactionLimits", (table) => {
    table.increments("id").primary().unique();
    table.integer("userId").unsigned().notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.decimal("totalAmount", 15, 2).defaultTo(0.0);
    table.date("limitExpiry").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("transactionLimits");
}
