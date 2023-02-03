import { FetcherConfig, FetcherResponse, HTTPMethods } from "./types";

interface DispatchArgs {
  method: HTTPMethods;
  url: string;
  data?: BodyInit;
  config?: FetcherConfig;
}

export default async function dispatch({
  method,
  url,
  data,
  config = {},
}: DispatchArgs): Promise<FetcherResponse> {
  let requestInit: RequestInit = {
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

  if (data instanceof FormData) requestInit.body = data;

  if (data != null && (typeof data === "object" || Array.isArray(data)))
    requestInit.body = JSON.stringify(data);

  const response = await fetch(`${url}`, requestInit);

  const contentType = response.headers.get("Content-Type");

  let result: FetcherResponse = {
    url: response.url,
    headers: response.headers,
    ok: response.ok,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
    bodyUser: response.bodyUsed,
    body: null,
    text: null,
  };

  if (contentType?.includes("application/json")) {
    result.body = await response.json();
  }

  if (contentType?.includes("text/")) {
    result.text = await response.text();
  }

  return result;
}
