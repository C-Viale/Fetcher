import FetcherInstance from "./FetcherInstance";
import type { FetcherConstructorArgs } from "./types";

export { default as Fetcher } from "./FetcherStatic";
export { FetcherError } from "./error";

export function createInstance(config: FetcherConstructorArgs) {
  return new FetcherInstance(config);
}

export type * from "./types";
