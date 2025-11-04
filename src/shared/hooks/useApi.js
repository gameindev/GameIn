import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../app/services/api";
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
                const prettyError = typeof apiError === "object"
                    ? (apiError.message || apiError.error || JSON.stringify(apiError))
                    : apiError;
                setError(prettyError);
                return Promise.reject(prettyError);
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

    const get = useCallback((config = {}) => {
        const { url, payload = {}, headers = {}, params = {} } = config;
        return callApi({ url, method: "GET", headers, params });
    }, [callApi]);

    const post = useCallback((config = {}) => {
        const { url, payload = {}, headers = {}, params = {} } = config;
        return callApi({ url, method: "POST", payload, headers, params });
    }, [callApi]);

    const patch = useCallback((config = {}) => {
        const { url, payload = {}, headers = {}, params = {} } = config;
        return callApi({ url, method: "PATCH", payload, headers, params });
    }, [callApi]);

    const put = useCallback((config = {}) => {
        const { url, payload = {}, headers = {}, params = {} } = config;
        return callApi({ url, method: "PUT", payload, headers, params });
    }, [callApi]);

    const del = useCallback((config = {}) => {
        const { url, payload = {}, headers = {}, params = {} } = config;
        return callApi({ url, method: "DELETE", headers, params });
    }, [callApi]);

    const refetch = useCallback(() => callApi(initialConfigRef.current), [callApi]);

    return {
        data,
        loading,
        error,
        get,
        post,
        patch,
        put,
        del,
        refetch,
    };
};

export default useApi;
