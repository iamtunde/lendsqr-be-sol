/** @format */

// src/controllers/wallet/wallet.controller.ts

import { Request, Response, NextFunction } from "express";
import { success, error } from "../../utils/response.api";
import { WalletService } from "./wallet.service";

export class WalletController {
  /**
   * @desc fund a users' wallet
   * @access Public
   * @route POST /wallets
   * @param {Request} req http request
   * @param {Response} res http response
   * @param {NextFunction} next next function for error handling
   * @returns a transaction record object
   */
  static async fundUserWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const data = await WalletService.fundUserWallet(payload);
      return success(res, "Wallet successfully funded.", data, 200);
    } catch (err) {
      next(err); // Pass the error to the centralized error handler
    }
  }

  /**
   * @desc find a users' wallet
   * @access Public
   * @route POST /wallets
   * @param {Request} req http request
   * @param {Response} res http response
   * @param {NextFunction} next next function for error handling
   * @returns an authenticated user wallet object
   */
  static async findUserWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WalletService.findUserWalletBalance(+req.body.userId);
      return success(res, "Wallet successfully retrieved.", data, 200);
    } catch (err) {
      next(err); // Pass the error to the centralized error handler
    }
  }

  /**
   * @desc look up account number
   * @access Public
   * @route PATCH /wallets/lookUp
   * @param {Request} req http request
   * @param {Response} res http response
   * @param {NextFunction} next next function for error handling
   * @returns lookUp response
   */
  static async lookUpWalletNuban(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const payload = req.body;
      console.log({ payload });
      const data = await WalletService.findWallet(payload);

      return success(res, "Account look-up successful.", data, 200);
    } catch (err) {
      next(err); // Pass the error to the centralized error handler
    }
  }

  /**
   * @desc sends money to user on platform
   * @access Public
   * @route POST /wallets/sendMoney
   * @param {Request} req http request
   * @param {Response} res http response
   * @param {NextFunction} next next function for error handling
   * @returns lookUp response
   */
  static async sendMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const data = await WalletService.sendMoney(payload);
      return success(res, "Transaction successful.", data, 200);
    } catch (err) {
      next(err); // Pass the error to the centralized error handler
    }
  }

  /**
   * @desc withdraws money from a user's wallet
   * @access Public
   * @route POST /wallets/withdraw
   * @param {Request} req http request
   * @param {Response} res http response
   * @param {NextFunction} next next function for error handling
   * @returns lookUp response
   */
  static async withdrawMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const data = await WalletService.withdrawMoney(payload);
      return success(res, "Transaction successful.", data, 200);
    } catch (err) {
      next(err); // Pass the error to the centralized error handler
    }
  }
}
