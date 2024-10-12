/** @format */

import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = 404;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
