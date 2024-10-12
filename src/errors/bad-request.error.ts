/** @format */

import { CustomError } from "./custom.error";

export class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 400;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
