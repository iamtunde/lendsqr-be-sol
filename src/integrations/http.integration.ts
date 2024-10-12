/** @format */

import axios, { AxiosRequestConfig } from "axios";

const config = (headers: object) => {
  const c: AxiosRequestConfig = {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  };

  return c;
};

export class HTTP {
  static async post(endpoint: string, payload: any, headers: object = {}) {
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    return await axios
      .post(`${endpoint}`, payload, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async patch(endpoint: string, payload: any, headers: object = {}) {
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    return await axios
      .patch(`${endpoint}`, payload, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async put(endpoint: string, payload: any, headers: object = {}) {
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    return await axios
      .put(`${endpoint}`, payload, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async get(
    endpoint: string,
    headers: object = {},
    payload: any = null,
  ) {
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };
    console.log({ config });
    if (payload) {
      config.data = payload;
      return await axios
        .get(`${endpoint}`, config)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      return await axios
        .get(`${endpoint}`, config)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }
}
