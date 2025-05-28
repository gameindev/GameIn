import { requestInterceptor, requestErrorInterceptor } from './request';
import { responseInterceptor, responseErrorInterceptor } from './response';

export const applyInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
};