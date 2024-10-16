"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var index_1 = require("./requests/middleware/index");
var errors_1 = require("./errors");
// Load events
require("./events/index");
// Load available route files
var routes_1 = require("./routes");
var bootstrap = (0, express_1.default)();
exports.bootstrap = bootstrap;
bootstrap.use(express_1.default.json());
bootstrap.use((0, cors_1.default)());
bootstrap.use(index_1.requestLogger);
bootstrap.set("trust proxy", true);
bootstrap.get("/", function (req, res) {
    res.status(301).redirect("https://lendsqr.com/");
});
// Ignite routes
bootstrap.use("/auth", routes_1.Authentication);
bootstrap.use("/wallets", routes_1.Wallet);
bootstrap.use("/transactions", routes_1.Transaction);
bootstrap.use("/resources", routes_1.Resource);
bootstrap.all("*", function (req, res, next) {
    next(new errors_1.NotFoundError("That endpoint does not exist."));
});
bootstrap.use(index_1.errorHandler);
//# sourceMappingURL=bootstrap.js.map