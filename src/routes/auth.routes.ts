/** @format */

import express from "express";
import {
  getSignInQRCodeImage,
  getSignInCode,
} from "../controllers/auth/auth.controller";
import { validatePhoneNumberString } from "../requests/validators";

const route = express.Router();

route.get("/get-qr-code", getSignInQRCodeImage);
route.get(
  "/get-code/:phone_number",
  [validatePhoneNumberString],
  getSignInCode,
);

export { route as Authentication };
