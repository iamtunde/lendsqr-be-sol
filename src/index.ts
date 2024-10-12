/** @format */

import path from "path";
import dotenv from "dotenv";
import { bootstrap } from "./bootstrap";
import { APP_ENVIRONMENT } from "./helpers/constant";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const port = process.env.PORT || 3000;
const environment = APP_ENVIRONMENT;

console.log(`\nStarting server...`);
console.log(`Starting server in ${environment} mode`);

bootstrap.listen(port, () => {
  console.log(`Server started on port: ${port}\n`);
});
