/** @format */

import express from "express";
import cors from "cors";
import { RequestLogger, ErrorHandler } from "./requests/middleware/index";
import { NotFoundError } from "./errors";

// Load available route files
import { Authentication } from "./routes/auth.routes";
import { Books } from "./routes/book.routes";

const bootstrap = express();

bootstrap.use(express.json());
bootstrap.use(cors());
bootstrap.use(RequestLogger);
bootstrap.set("trust proxy", true);

bootstrap.get("/", (req, res) => {
  res.status(301).redirect("https://usekivu.com");
});

// Ignite routes
bootstrap.use("/auth", Authentication);
bootstrap.use("/books", Books);

bootstrap.all("*", (req, res, next) => {
  next(new NotFoundError("That endpoint does not exist."));
});

bootstrap.use(ErrorHandler);

export { bootstrap };
