/** @format */

import { CustomError } from "./custom.error";

export class InternalServerError extends CustomError {
  constructor(message: any) {
    super(message);
    this.message = message;
    this.statusCode = 500;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
