"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var bootstrap_1 = require("./bootstrap");
var constant_1 = require("./helpers/constant");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
var port = process.env.PORT || 3000;
var environment = constant_1.APP_ENVIRONMENT;
console.log("\nStarting server...");
console.log("Starting server in ".concat(environment, " mode"));
bootstrap_1.bootstrap.listen(port, function () {
    console.log("Server started on port: ".concat(port, "\n"));
});
//# sourceMappingURL=index.js.map