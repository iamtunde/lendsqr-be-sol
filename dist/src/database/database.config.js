"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexfile_1 = __importDefault(require("../../knexfile"));
var constant_1 = require("../helpers/constant");
var config = knexfile_1.default[constant_1.APP_ENVIRONMENT];
var database = (0, knex_1.default)(config);
exports.default = database;
//# sourceMappingURL=database.config.js.map