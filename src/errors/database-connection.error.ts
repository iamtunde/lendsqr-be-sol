/** @format */

import { CustomError } from "./custom.error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  errCode: string;
  constructor(message, errCode = null) {
    super(message);
    this.message = message;
    this.statusCode = 500;
    this.errCode = errCode;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    if (this.errCode === "22P02") {
      return [{ message: "Invalid input syntax for id" }];
    }
    if (this.errCode === "23505") {
      return [{ message: "Duplicate value for a unique field" }];
    }
    return [{ message: this.message }];
  }
}
