/** @format */

import express from "express";
import cors from "cors";
import { requestLogger, errorHandler } from "./requests/middleware/index";
import { NotFoundError } from "./errors";

// Load events
import "./events/index";

// Load available route files
import { Authentication, Wallet, Transaction, Resource } from "./routes";

const bootstrap = express();

bootstrap.use(express.json());
bootstrap.use(cors());
bootstrap.use(requestLogger);
bootstrap.set("trust proxy", true);

bootstrap.get("/", (req, res) => {
  res.status(301).redirect("https://lendsqr.com/");
});

// Ignite routes
bootstrap.use("/auth", Authentication);
bootstrap.use("/wallets", Wallet);
bootstrap.use("/transactions", Transaction);
bootstrap.use("/resources", Resource);

bootstrap.all("*", (req, res, next) => {
  next(new NotFoundError("That endpoint does not exist."));
});

bootstrap.use(errorHandler);

export { bootstrap };
