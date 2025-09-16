import { useState, useCallback, useEffect, useRef } from "react";
import api from "../services/axios/";
import qs from "qs";

const useApi = ({
  url = null,
  method = "GET",
  payload = null,
  headers = {},
  params = {},
  autoFetch = false,
} = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialConfigRef = useRef({ url, method, payload, headers, params });

  const callApi = useCallback(
    async ({
      url,
      method = "GET",
      payload = null,
      headers = {},
      params = {},
    }) => {
      if (!url) return Promise.reject("URL is required");

      setLoading(true);
      setError(null);

      try {
        const response = await api({
          url,
          method,
          ...(payload && { data: payload }),
          ...(headers && { headers }),
          ...(params && {
            params,
            paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
          }),
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        const apiError = err.response?.data || err.message;
        setError(apiError);
        return Promise.reject(apiError);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (autoFetch && url) {
      callApi(initialConfigRef.current);
    }
  }, [autoFetch, url, callApi]);

  // const createMethod =
  //   (methodType) =>
  //   (url, payload = {}, headers = {}, params = {}) => {
  //     const isPayloadMethod = ["POST", "PUT", "PATCH"].includes(methodType);
  //     console.log(url, payload, headers, params);

  //     return callApi({
  //       url,
  //       method: methodType,
  //       ...(isPayloadMethod && { payload }),
  //       ...(headers && { headers }),
  //       ...(params && { params }),
  //     });
  //   };

  const createMethod =
    (methodType) =>
    (config = {}) => {
      const { url, payload = {}, headers = {}, params = {} } = config;
      const isPayloadMethod = ["POST", "PUT", "PATCH"].includes(methodType);

      return callApi({
        url,
        method: methodType,
        ...(isPayloadMethod && { payload }),
        ...(headers && { headers }),
        ...(params && { params }),
      });
    };

  return {
    data,
    loading,
    error,
    get: createMethod("GET"),
    post: createMethod("POST"),
    patch: createMethod("PATCH"),
    put: createMethod("PUT"),
    del: createMethod("DELETE"),
    refetch: () => callApi(initialConfigRef.current),
  };
};

export default useApi;
