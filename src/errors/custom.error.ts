/** @format */

// src/errors/custom.error.ts
import { Response } from "express";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors() {
    return [{ message: this.message || "Something went wrong." }];
  }

  sendErrorResponse(res: Response) {
    return res.status(this.statusCode).json(this.serializeErrors());
  }
}
