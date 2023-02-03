export type HTTPMethods = 'GET' | 'HEAD' |  'POST' | 'PUT' | 'DELETE' | 'CONNECT'  | 'OPTIONS' | 'TRACE' | 'PATCH'

export interface FetcherConfig {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: null;
}

export interface FetcherResponse {
  url: string,
  headers: Headers,
  ok: boolean,
  redirected: boolean,
  status: number,
  statusText: string,
  type: string,
  bodyUser: boolean,
  body: Record<string, unknown> | null,
  text: string | null,
}


export interface FetcherConstructorParams {
  baseURL?: string;
  defaultHeaders?: Record<string, string>
}