import useApi from './useApi';

const useApiHandler = ({ autoFetch = false, url, method = 'GET', payload, headers }) => {
  const { data, loading, error, callApi } = useApi({ url, method, payload, headers, autoFetch });

  const get = (url, headers) => callApi({ url, headers, method: 'GET' });
  const post = (url, payload, headers) => callApi({ url, payload, headers, method: 'POST'});
  const put = (url, payload, headers) => callApi({ url, payload, headers, method: 'PUT' });
  const del = (url, headers) => callApi({ url, headers, method: 'DELETE'});

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: del,
  };
};

export default useApiHandler;
