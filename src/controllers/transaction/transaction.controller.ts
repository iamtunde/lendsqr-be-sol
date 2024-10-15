/** @format */
// src/controllers/transaction/transaction.controller.ts

import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";
import { success } from "../../utils/response.api";

export class TransactionController {
  /**
   * @desc list users' transactions
   * @access Public
   * @route GET /transactions
   * @param {Request} req http request
   * @param {Response} res http response
   * @returns a list of transactions
   */
  static async getUserTransactions(req: Request, res: Response) {
    const { userId } = req.body;

    const data = await TransactionService.getUserTransactions(userId);

    return success(res, "Successfully retrieved transactions.", data, 200);
  }

  /**
   * @desc a retrieve a single transaction record
   * @access Public
   * @route GET /transactions/:reference
   * @param {Request} req http request
   * @param {Response} res http response
   * @returns transaction objet
   */
  static async getOneTransaction(req: Request, res: Response) {
    const { reference } = req.params;

    const data = await TransactionService.getOneUserTransaction(reference);

    return success(res, "Transaction retrieved successfully.", data, 200);
  }
}
