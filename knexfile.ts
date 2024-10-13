/** @format */

// Update with your config settings.
import { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const databaseConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },

  test: {
    client: "mysql2",
    connection: {
      host: process.env.DB_TEST_HOST,
      user: process.env.DB_TEST_USERNAME,
      password: process.env.DB_TEST_PASSWORD,
      database: process.env.DB_TEST_NAME,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },
};

export default databaseConfig;
