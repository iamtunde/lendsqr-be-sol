"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, ".env"),
});
exports.config = {
    appId: process.env.ADJUTOR_APP_ID,
    apiKey: process.env.ADJUTOR_API_KEY,
    apiUrl: process.env.ADJUTOR_API_URL,
};
//# sourceMappingURL=config.adjutor.js.map