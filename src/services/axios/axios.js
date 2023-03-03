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

  instance.interceptors.response.use((response) => {
    return response;
  }, axiosResponseInterceptorError);
  return instance;
};

export const axiosV1 = ({ endpoint = "" }) => {
  // eslint-disable-next-line
    return instanceGenerator(import.meta.env.VITE_APP_URL +'/v1/'+ endpoint);
};

export const axiosBase = ({ endpoint = "" }) => {
  return instanceGenerator(import.meta.env.VITE_APP_URL + "/" + endpoint);
};

export const axiosDev = ({ endpoint = "" }) => {
  // eslint-disable-next-line
  return instanceGenerator(import.meta.env.VITE_APP_DEV_API +'/'+ endpoint);
};

export const axiosMock = ({ endpoint = "" }) => {
  // eslint-disable-next-line
  return instanceGenerator(import.meta.env.VITE_APP_MOCK_API +'/'+ endpoint);
};
