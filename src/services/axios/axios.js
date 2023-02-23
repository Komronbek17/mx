import axios from "axios";
import {
  axiosRequestInterceptResponse,
  axiosResponseInterceptorError,
} from "@/services/axios/interceptor.axios";

const instanceGenerator = (baseUrl) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.request.use(axiosRequestInterceptResponse, (error) =>
    Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    axiosResponseInterceptorError
  );
  return instance;
};

export const axiosV1 = ({ endpoint = "" }) => {
  // eslint-disable-next-line
    return instanceGenerator(import.meta.env.VITE_APP_URL +'/'+ endpoint);
};
