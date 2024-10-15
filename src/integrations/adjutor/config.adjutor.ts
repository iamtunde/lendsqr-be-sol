/** @format */

import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export const config = {
  appId: process.env.ADJUTOR_APP_ID,
  apiKey: process.env.ADJUTOR_API_KEY,
  apiUrl: process.env.ADJUTOR_API_URL,
};
