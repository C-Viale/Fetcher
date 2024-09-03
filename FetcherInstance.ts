import { dispatch } from "./dispatch";
import type {
  FetcherBodylessRequestArgs,
  FetcherConfig,
  FetcherConstructorArgs,
  FetcherRequestArgs,
} from "./types";

function buildConfig(
  config: FetcherConfig | undefined,
  defaultHeaders: Record<string, string>
) {
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

  constructor({ defaultHeaders = {}, baseURL }: FetcherConstructorArgs) {
    this.defaultHeaders = defaultHeaders;
    this.baseURL = baseURL;
  }

  async get<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "GET",
      url: `${this.baseURL}${args.url}`,
      config: buildConfig(args.config, this.defaultHeaders),
    });
  }
  async delete<T = unknown>(args: FetcherBodylessRequestArgs) {
    return dispatch<T>({
      method: "DELETE",
      url: `${this.baseURL}${args.url}`,
      config: buildConfig(args.config, this.defaultHeaders),
    });
  }
  async post<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "POST",
      url: `${this.baseURL}${args.url}`,
      data: args.data,
      config: buildConfig(args.config, this.defaultHeaders),
    });
  }
  async put<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "PUT",
      url: `${this.baseURL}${args.url}`,
      data: args.data,
      config: buildConfig(args.config, this.defaultHeaders),
    });
  }
  async patch<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "PATCH",
      url: `${this.baseURL}${args.url}`,
      data: args.data,
      config: buildConfig(args.config, this.defaultHeaders),
    });
  }
}
