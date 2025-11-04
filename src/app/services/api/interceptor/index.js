import { requestErrorInterceptor, requestInterceptor } from "./request";
import { responseErrorInterceptor, responseInterceptor } from "./response";


export const applyInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
    axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
};