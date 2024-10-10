import { dispatch } from "./dispatch";
import type {
  FetcherBodylessRequestArgs,
  FetcherConfig,
  FetcherConstructorArgs,
  FetcherRequestArgs,
  OnErrorHandler,
} from "./types";

function buildConfig(config: FetcherConfig | undefined, defaultHeaders: Record<string, string>) {
  return {
    ...config,
    headers: {
      ...defaultHeaders,
      ...config?.headers,
    },
  };
}

export default class FetcherInstance {
  defaultHeaders: Record<string, string> = {};
  baseURL?: string;
  onError?: OnErrorHandler;

  constructor({ defaultHeaders = {}, baseURL, onError }: FetcherConstructorArgs) {
    this.defaultHeaders = defaultHeaders;
    this.baseURL = baseURL;
    this.onError = onError;
  }

  async get<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "GET",
      url: `${this.baseURL}${args.url}`,
      config: buildConfig(args.config, this.defaultHeaders),
      onError: this.onError,
    });
  }
  async delete<T = unknown>(args: FetcherBodylessRequestArgs) {
    return dispatch<T>({
      method: "DELETE",
      url: `${this.baseURL}${args.url}`,
      config: buildConfig(args.config, this.defaultHeaders),
      onError: this.onError,
    });
  }
  async post<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "POST",
      url: `${this.baseURL}${args.url}`,
      data: args.data,
      config: buildConfig(args.config, this.defaultHeaders),
      onError: this.onError,
    });
  }
  async put<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "PUT",
      url: `${this.baseURL}${args.url}`,
      data: args.data,
      config: buildConfig(args.config, this.defaultHeaders),
      onError: this.onError,
    });
  }
  async patch<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "PATCH",
      url: `${this.baseURL}${args.url}`,
      data: args.data,
      config: buildConfig(args.config, this.defaultHeaders),
      onError: this.onError,
    });
  }
}
