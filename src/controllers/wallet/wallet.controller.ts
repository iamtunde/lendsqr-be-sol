/** @format */

// src/controllers/wallet/wallet.controller.ts

import { Request, Response } from "express";
import { success } from "../../utils/response.api";
import { WalletService } from "./wallet.service";

/**
 * @desc fund a users' wallet
 * @access Public
 * @route POST /wallets
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a transaction record object
 */
export const fundUserWallet = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await WalletService.fundUserWallet(payload);

  return success(res, "Wallet successfully funded.", data, 200);
};

/**
 * @desc find a users' wallet
 * @access Public
 * @route POST /wallets
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns an authenticated user wallet object
 */
export const findUserWallet = async (req: Request, res: Response) => {
  const data = await WalletService.findUserWalletBalance(+req.body.userId);

  return success(res, "Wallet successfully retrieved.", data, 200);
};

/**
 * @desc look up account number
 * @access Public
 * @route POST /wallets/lookUp
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns lookUp response
 */
export const lookUpWalletNuban = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await WalletService.findWallet(payload);

  return success(res, "Account look-up successful.", data, 200);
};

/**
 * @desc sends money to user on platform
 * @access Public
 * @route POST /wallets/sendMoney
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns lookUp response
 */
export const sendMoney = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await WalletService.sendMoney(payload);

  return success(res, "Transaction successful.", data, 200);
};

/**
 * @desc withdraws money from a user's wallet
 * @access Public
 * @route POST /wallets/withdraw
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns lookUp response
 */
export const withdrawMoney = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await WalletService.withdrawMoney(payload);

  return success(res, "Transaction successful.", data, 200);
};
