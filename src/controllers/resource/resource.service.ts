/** @format */

// src/controllers/resource/resource.service.ts

import { Adjutor } from "../../integrations/adjutor";

export class ResourceService {
  static async getBanks() {
    try {
      const banks = await Adjutor.listBanks();

      return banks;
    } catch (error) {
      throw error;
    }
  }
}
