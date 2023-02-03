import { FetcherConfig, FetcherConstructorParams } from "./types";
import dispatch from "./dispatch";

export default class FetcherInstance {
  defaultHeaders: Record<string, string> = {};
  baseURL?: string;

  constructor({ defaultHeaders = {}, baseURL }: FetcherConstructorParams) {
    this.defaultHeaders = defaultHeaders;
    this.baseURL = baseURL;
  }

  async get(url: string, config?: FetcherConfig) {
    return await dispatch({
      method: "GET",
      url: `${this.baseURL}${url}`,
      config: {
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config?.headers,
        },
      },
    });
  }

  async post(url: string, data?: BodyInit, config?: FetcherConfig) {
    return await dispatch({
      method: "GET",
      data,
      url: `${this.baseURL}${url}`,
      config: {
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config?.headers,
        },
      },
    });
  }

  async put(url: string, data?: any, config?: FetcherConfig) {
    return await dispatch({
      method: "PUT",
      data,
      url: `${this.baseURL}${url}`,
      config: {
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config?.headers,
        },
      },
    });
  }

  async delete(url: string, config?: FetcherConfig) {
    return await dispatch({
      method: "DELETE",
      url: `${this.baseURL}${url}`,
      config: {
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config?.headers,
        },
      },
    });
  }
}
