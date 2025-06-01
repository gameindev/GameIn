import { useState, useEffect, useCallback } from "react";
import api from "../services/axios/";

const useApi = ({ url, method = "GET", payload, headers, autoFetch = false, }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback( async ({ url, payload, headers, method = "GET"}) => {
    if (!url) return;
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        url,
        method,
        ...(payload && { data: payload }),
        ...(headers && { headers: headers }),
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch && url) {
      callApi({ url, method, payload, headers });
    }
  }, [autoFetch, url, method, payload, headers, callApi]);

  return { data, loading, error, callApi };
};

export default useApi;
