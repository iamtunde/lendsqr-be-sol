/** @format */

import axios, { AxiosRequestConfig } from "axios";

export class HTTP {
  protected static requestConfig(headers: object | null) {
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    return config;
  }

  static async post(endpoint: string, payload: any, headers: object = {}) {
    const config = this.requestConfig(headers);
    let response = null;
    try {
      response = await axios.post(`${endpoint}`, payload, config);
    } catch (err) {
      const { status } = response.err;
      throw new Error(`Request failed with ${status}`);
    }

    return response.data;
  }

  static async get(
    endpoint: string,
    headers: object = {},
    payload: any = null,
  ) {
    const config = this.requestConfig(headers);

    let response = null;

    try {
      if (payload) {
        config.data = payload;
        response = await axios.get(`${endpoint}`, config);
      } else {
        response = await axios.get(`${endpoint}`, config);
      }
    } catch (err) {
      if (err.response.status === 404) {
        response = err.response;
      } else {
        const { status } = response.err;
        throw new Error(`Request failed with ${status}`);
      }
    }

    return response.data;
  }
}
