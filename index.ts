import FetcherInstance from "./FetcherInstance";
import { FetcherConstructorParams } from "./types";

export function createInstance(config: FetcherConstructorParams) {
  return new FetcherInstance(config);
}

export { default as Fetcher } from "./FetcherStatic";
