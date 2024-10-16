"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, ".env"),
});
var databaseConfig = {
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
exports.default = databaseConfig;
//# sourceMappingURL=knexfile.js.map