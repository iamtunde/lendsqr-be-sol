/** @format */

import express from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import { signInValidation, signUpValidation } from "../requests/validators";
import { checkBlackList } from "../requests/middleware";

const route = express.Router();

route.post(
  "/signUp",
  [signUpValidation, checkBlackList],
  AuthController.signUp,
);
route.post("/signIn", signInValidation, AuthController.signIn);

export { route as Authentication };
