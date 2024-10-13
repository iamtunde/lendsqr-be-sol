/** @format */

import { Knex } from "knex";
import data from "./users.json";
import { encrypt } from "../../utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes all existing records
  await knex("users").del();
  await knex("wallets").del();
  await knex("transactionLimits").del();

  const users: any[] = await Promise.all(
    data.map(async (user) => {
      const hashedPassword = await encrypt(user.password);

      return {
        ...user,
        password: hashedPassword,
      };
    }),
  );

  await knex("users").insert(users).select("id");

  const entries = await knex("users")
    .whereIn(
      "email",
      users.map((user) => user.email),
    )
    .select(["id", "phone"]);

  // Insert corresponding wallets and transaction limits for each user
  await Promise.all(
    entries.map((entry) => {
      return Promise.all([
        knex("wallets").insert({
          userId: entry.id,
          nuban: entry.phone.replace("234", ""), // Assume phone number formatting
        }),

        knex("transactionLimits").insert({
          userId: entry.id,
        }),
      ]);
    }),
  );
}
