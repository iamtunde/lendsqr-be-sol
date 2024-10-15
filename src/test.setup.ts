/** @format */

import Knex from "knex";
import databaseConfig from "../knexfile";
export const knexInstance = Knex(databaseConfig.test);

beforeAll(async () => {
  await knexInstance.migrate.rollback(); // Rollback migrations
  await knexInstance.migrate.latest(); // Apply latest migrations
  await knexInstance.seed.run(); // Optionally run seeds
});

afterAll(async () => {
  await knexInstance.destroy(); // Destroy the connection pool after all tests
});
