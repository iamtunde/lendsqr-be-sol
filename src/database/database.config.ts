/** @format */

import knex from "knex";
import databaseConfig from "../../knexfile";
import { APP_ENVIRONMENT } from "../helpers/constant";

const config = databaseConfig[APP_ENVIRONMENT];

const database = knex(config);

export default database;
