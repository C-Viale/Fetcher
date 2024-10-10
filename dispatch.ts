import { FetcherError } from "./error";
import { statusMessages } from "./messages";
import type { DispatchArgs, FetcherResponse } from "./types";

export async function dispatch<T = unknown>({
  method,
  url,
  data,
  config = {},
  onError,
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

  let result: FetcherResponse<T>;

  try {
    const response = await fetch(request);

    const contentType = response.headers.get("Content-Type");

    let responseData: unknown = null;

    if (contentType?.includes("application/json")) {
      responseData = await response.json();
    }
    if (contentType?.includes("text/")) {
      responseData = await response.text();
    }

    const statusText = statusMessages[response.status.toString()];

    result = {
      url: response.url,
      data: (responseData ?? null) as T,
      status: response.status,
      statusText,
      headers: response.headers,
    };

    if (!response.ok) {
      throw new FetcherError({
        message: `${response.status} (${statusText})`,
        response: result,
      });
    }

    return result;
  } catch (error) {
    if (error instanceof FetcherError) {
      onError?.({ statusCode: error.response?.status || null });
      throw error;
    }
    if (error instanceof Error) {
      onError?.({ statusCode: null });
      throw new FetcherError({ message: error.message, request });
    }

    onError?.({ statusCode: null });
  }

  return result!;
}
