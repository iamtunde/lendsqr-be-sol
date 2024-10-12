/** @format */

import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError {
  constructor(message: any) {
    super(message);
    this.message = message;
    this.statusCode = 401;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
