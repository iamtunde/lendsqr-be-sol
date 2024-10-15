/** @format */

export const APP_ENVIRONMENT = process.env.NODE_ENV || "development";

export enum TRANSACTION_STATUS {
  FAILED = "failed",
  PROCESSING = "processing",
  SUCCESSFUL = "successful",
}

export enum TRANSACTION_TYPES {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum TRANSACTION_MESSAGES {
  FUND = "wallet funded",
  DEBIT = "wallet debited",
}

export enum EVENT_TYPES {
  LOG_TRANSACTION = "log-transaction",
}

export const DAILY_TRANSACTION_LIMIT = 10000;
