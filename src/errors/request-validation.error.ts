/** @format */

import { CustomError } from "./custom.error";

export class RequestValidationError extends CustomError {
  errors: any;
  constructor(errors: any) {
    super("Invalid request parameters");
    this.errors = errors.details;
    this.statusCode = 422;
    this.name = "RequestValidationError";
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const messages = [];

    this.errors.map((err: any) => {
      messages.push({
        key: err.context.key,
        message: err.message,
      });
    });

    return messages;
  }
}
