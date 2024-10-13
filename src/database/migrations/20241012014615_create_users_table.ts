/** @format */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary().unique();
    table.string("firstName", 100).notNullable();
    table.string("lastName", 100).notNullable();
    table.string("phone", 13).notNullable().unique();
    table.string("email", 50).notNullable().unique();
    table.string("password", 225).notNullable();
    table.integer("level", 1).defaultTo(1);
    table.boolean("isActive").defaultTo(true);
    table.timestamp("lastLogin").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
