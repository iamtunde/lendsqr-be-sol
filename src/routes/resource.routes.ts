/** @format */

import express from "express";

import { ResourceController } from "../controllers/resource/resource.controller";

const route = express.Router();

route.get("/banks", ResourceController.getBankList);

export { route as Resource };
