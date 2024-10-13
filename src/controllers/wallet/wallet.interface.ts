/** @format */

export interface IFundWallet {
  userId: number;
  amount: number;
}

export interface IFindWallet {
  userId: number;
  nuban: string;
}

export interface ISendMoney extends IFindWallet {
  amount: number;
}

export interface IWithdrawMoney {
  accountNumber: string;
  accountName: string;
  bankName: string;
  userId?: number;
  amount: number;
}
