import { useState, useCallback, useEffect, useRef } from "react";
import api from "../services/axios/";

const useApi = ({ url = null, method = "GET", payload = null, headers = {}, autoFetch = false, } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Store initial config for potential refetch
  const initialConfigRef = useRef({ url, method, payload, headers });

  const callApi = useCallback( async ({ url, method = "GET", payload = null, headers = {} }) => {
    if (!url) return Promise.reject("URL is required");

    setLoading(true);
    setError(null);

    try {
      const response = await api({ url, method, ...(payload && { data: payload }), ...(headers && { headers: headers }), });
      setData(response.data);
      return response.data;
    } catch (err) {
      const apiError = err.response?.data || err.message;
      setError(apiError);
      return Promise.reject(apiError);
    } finally {
      setLoading(false);
    }
  },[]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && url) {
      callApi(initialConfigRef.current);
    }
  }, [autoFetch, url, callApi]);

  // Create request method wrapper
  const createMethod = methodType => (url, payload = {}, headers = {}) =>{
    const isPayloadMethod = ["POST", "PUT", "PATCH"].includes(methodType);    
    return callApi({ url, method: methodType, ...(isPayloadMethod && {payload: payload}), ...(headers && {headers: headers}), });
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
