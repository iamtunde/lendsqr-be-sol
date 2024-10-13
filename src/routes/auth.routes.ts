/** @format */

import express from "express";
import { signIn, signUp } from "../controllers/auth/auth.controller";
import { signInValidation, signUpValidation } from "../requests/validators";

const route = express.Router();

route.post("/signUp", signUpValidation, signUp);
route.post("/signIn", signInValidation, signIn);

export { route as Authentication };
