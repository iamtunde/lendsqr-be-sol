/** @format */

import { CustomError } from "./custom.error";

export class ForbiddenError extends CustomError {
  constructor(message: any) {
    super(message);
    // this.message = message;
    this.statusCode = 403;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
