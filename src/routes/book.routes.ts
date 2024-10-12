/** @format */

import express from "express";
import { BooksController } from "../controllers/books/books.controller";

const route = express.Router();

route.get("/", BooksController.searchBooks);

export { route as Books };
