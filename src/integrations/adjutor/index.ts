/** @format */

import { config } from "./config.adjutor";
import { HTTP } from "../http.integration";

export class Adjutor {
  protected static header() {
    return {
      Authorization: `Bearer ${config.apiKey}`,
    };
  }

  static async karmaLookUp(identity: string): Promise<any> {
    const response = await HTTP.get(
      `${config.apiUrl}verification/karma/${identity}`,
      this.header(),
    ).catch((error) => {
      console.log({ error });
    });

    return response;
  }

  static async listBanks(): Promise<object[]> {
    const response = await HTTP.get(
      `${config.apiUrl}banks`,
      this.header(),
    ).catch((error) => {
      console.log({ error });
    });

    return response.data;
  }
}
