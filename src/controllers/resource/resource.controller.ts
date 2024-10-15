/** @format */

// src/controllers/resource/resource.controller.ts
import { Request, Response } from "express";
import { ResourceService } from "./resource.service";
import { success } from "../../utils/response.api";

export class ResourceController {
  /**
   * @desc list operational banks for withdrawals
   * @access Public
   * @route GET /transactions
   * @param {Request} req http request
   * @param {Response} res http response
   * @returns a list of transactions
   */
  static async getBankList(req: Request, res: Response) {
    const data = await ResourceService.getBanks();

    return success(res, "Successfully retrieved transactions.", data, 200);
  }
}
