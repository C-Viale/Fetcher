import dispatch from "./dispatch";
import { FetcherConfig } from "./types";

const FetcherStatic = {
  get: async (url: string, config?: FetcherConfig) => {
    return await dispatch({
      method: "GET",
      url,
      config,
    });
  },

  post: async (url: string, data?: BodyInit, config?: FetcherConfig) => {
    return await dispatch({
      method: "GET",
      data,
      url,
      config,
    });
  },

  put: async (url: string, data?: any, config?: FetcherConfig) => {
    return await dispatch({
      method: "PUT",
      data,
      url,
      config,
    });
  },

  delete: async (url: string, config?: FetcherConfig) => {
    return await dispatch({
      method: "DELETE",
      url,
      config,
    });
  },
};

export default FetcherStatic;
