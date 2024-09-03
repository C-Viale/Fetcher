import type { FetcherResponse } from "./types";

export class FetcherError extends Error {
  name = "FetcherError";

  request?: Request;
  response?: FetcherResponse;

  constructor(params: {
    message: string;
    request?: Request;
    response?: FetcherResponse;
  }) {
    super(params.message);
    this.request = params.request;
    this.response = params.response;
  }
}
