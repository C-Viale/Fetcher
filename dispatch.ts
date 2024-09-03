import { FetcherError } from "./error";
import type { DispatchArgs, FetcherResponse } from "./types";

export async function dispatch<T = unknown>({
  method,
  url,
  data,
  config = {},
}: DispatchArgs) {
  const requestInit: RequestInit = {
    method,
    body: null,
    keepalive: true,
    window: null,
    mode: "cors",
    ...config,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      ...config.headers,
    },
  };

  if (data instanceof FormData || typeof data == "string") {
    requestInit.body = data;
  }

  if (data != null && typeof data === "object") {
    requestInit.body = JSON.stringify(data);
  }

  const request = new Request(url, requestInit);

  try {
    const response = await fetch(request);

    const contentType = response.headers.get("Content-Type");

    let data: unknown = null;
    
    if (contentType?.includes("application/json")) {
      data = await response.json();
    }
    if (contentType?.includes("text/")) {
      data = await response.text();
    }

    const result: FetcherResponse<T> = {
      url: response.url,
      data: (data ?? null) as T,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };

    if (!response.ok) {
      throw new FetcherError({
        message: `${response.status} (${response.statusText})`,
        response: result,
      });
    }

    return result;
  } catch (error) {
    if (error instanceof FetcherError) throw error;
    if (error instanceof Error)
      throw new FetcherError({ message: error.message, request });
  }
}
