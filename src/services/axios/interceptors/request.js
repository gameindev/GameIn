export const requestInterceptor = (config) => {
  // const token = getToken();
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
};

export const requestErrorInterceptor = (error) => {
  console.error('Request Error Interceptor:', error);
  return Promise.reject(error);
};