/** @format */

import { Req, LogErrors } from "../../decorators/index.decorators";
import { Request, Response } from "express";

@Req()
export class BooksController {
  @LogErrors()
  static async searchBooks(req, res) {
    try {
      const request = await fetch("https://api.alquran.cloud/v1/edition");

      // Check if the request was successful
      if (!request.ok) {
        return res.status(400).json({
          code: request.status,
          message: `Error fetching data: ${request.statusText}`,
        });
      }

      const { code, status, data } = await request.json();

      return res.status(200).json({
        code,
        message: status || "Request successful",
        data,
      });
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({
        code: 500,
        message: "An error occurred while processing your request.",
      });
    }
  }
}
