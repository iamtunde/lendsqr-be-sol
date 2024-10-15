/** @format */

import {
  createNubanFromPhone,
  removePlusSign,
} from "../../utils/sanitize.phone";
import { UserModel } from "../../models/user.model";
import { BadRequestError, UnauthorizedError } from "../../errors";
import { encrypt, verify } from "../../utils/hash";
import dayjs from "dayjs";
import { signToken } from "./jwt.strategy";
import { ISignIn, ISignUp } from "./auth.interface";
import { WalletModel } from "../../models/wallet.model";
import { TransactionLimitModel } from "../../models/transactionLimit.model";
import { Adjutor } from "../../integrations/adjutor";

export class AuthService {
  static async signUp(payload: ISignUp) {
    // Starts DB transaction
    const dbTransaction = await UserModel.startDBTransaction();

    // Sanitize the phone number
    payload.phone = removePlusSign(payload.phone);

    try {
      // Validate unique email
      const isEmailUnique = await UserModel.isUniqueFields({
        email: payload.email,
      });
      if (!isEmailUnique) {
        throw new BadRequestError("Email is already in use.");
      }

      // Validate unique phone number
      const isPhoneUnique = await UserModel.isUniqueFields({
        phone: payload.phone,
      });
      if (!isPhoneUnique) {
        throw new BadRequestError("Phone number is already in use.");
      }

      // Encrypt the user's password before storing
      payload.password = await encrypt(payload.password);

      // Create the user entry in the database
      const { id: userId } = await UserModel.createUserEntry(
        payload,
        dbTransaction,
      );

      // Create the wallet and transaction limit entries in parallel
      await Promise.all([
        WalletModel.createWalletEntry(
          { userId, nuban: createNubanFromPhone(payload.phone) },
          dbTransaction,
        ),
        TransactionLimitModel.createTransactionLimitEntry(
          { userId },
          dbTransaction,
        ),
      ]);

      // Commit the transaction
      await dbTransaction.commit();

      // Fetch the created user, remove password field before returning
      const user = await UserModel.findUserById(userId);
      delete user.password; // Make sure the password is not returned

      return user;
    } catch (error) {
      // Rollback the transaction if an error occurs
      await dbTransaction.rollback();

      throw error;
    }
  }

  static async signIn(payload: ISignIn) {
    try {
      const { email, password } = payload;

      const user = await UserModel.findUserByEmail(email);

      if (!user) {
        throw new UnauthorizedError("Incorrect login credentials.");
      }

      if (!verify(user.password, password)) {
        throw new UnauthorizedError("Incorrect login credentials.");
      }

      if (!user.isActive) {
        throw new UnauthorizedError(
          "Your account is inactive, kindly send a complaint to support@lendsqr.com",
        );
      }

      delete user.password;

      user.token = signToken({ id: user.id, email: user.email });

      // Save last login
      await UserModel.updateOneUser(user.id, {
        lastLogin: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
