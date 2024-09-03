import { dispatch } from "./dispatch";
import type { FetcherBodylessRequestArgs, FetcherRequestArgs } from "./types";

export default class FetcherStatic {
  static async get<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "GET",
      url: args.url,
      config: args.config,
    });
  }
  static async delete<T = unknown>(args: FetcherBodylessRequestArgs) {
    return dispatch<T>({
      method: "DELETE",
      url: args.url,
      config: args.config,
    });
  }
  static async post<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "POST",
      url: args.url,
      data: args.data,
      config: args.config,
    });
  }
  static async put<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "PUT",
      url: args.url,
      data: args.data,
      config: args.config,
    });
  }
  static async patch<T = unknown>(args: FetcherRequestArgs) {
    return dispatch<T>({
      method: "PATCH",
      url: args.url,
      data: args.data,
      config: args.config,
    });
  }
}
