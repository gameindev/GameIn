import { useState, useCallback, useEffect } from "react";
import api from "../services/axios/";

const useApi = ({ url = null, method = "GET", payload = null, headers = {}, autoFetch = false } = {}) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(
    async ({ url, method = "GET", payload = null, headers = {} }) => {
      if (!url) return;
      setLoading(true);
      setError(null);

      try {
        const response = await api({
          url,
          method,
          ...(payload && { data: payload }),
          ...(headers && { headers }),
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

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && url) {
      callApi({ url, method, payload, headers });
    }
  }, [autoFetch, url, method, payload, headers, callApi]);

  const createMethod = (methodType) => (url, payload = {}, headers = {}) => {
    const isPayloadMethod = ["POST", "PUT"].includes(methodType);
    return callApi({
      url,
      method: methodType,
      ...(isPayloadMethod && payload),
      ...(headers && headers),
    });
  };

  return {
    data,
    loading,
    error,
    get: createMethod("GET"),
    post: createMethod("POST"),
    put: createMethod("PUT"),
    delete: createMethod("DELETE"),
    // refetch: callApi, // optional for refetching the same config
  };
};

export default useApi;

// UI Usage

// const { data, loading, error, get, post, refetch } = useApi({
//     url: "/users",
//     method: "GET",
//     autoFetch: true,
//   });
  
//   useEffect(() => {
//     post("/users", { name: "John" });
//   }, []);
  