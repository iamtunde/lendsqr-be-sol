/** @format */

import { HTTP } from "../http.integration";
import { config } from "./config.paystack";

export class Paystack {
  async transactionVerify(transactionId: string) {
    const response = await HTTP.get(config.url, {
      Authorization: config.sk_key,
    }).catch((error) => {
      console.log({ error });
    });

    return response;
  }
}
