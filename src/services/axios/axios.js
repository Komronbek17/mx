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

export const axiosVersion = ({
  endpoint = "",
  baseUrl = import.meta.env.VITE_APP_URL,
}) => {
  return instanceGenerator(baseUrl + `/v1/api/` + endpoint);
};

export const axiosV1 = ({ endpoint = "" }) => {
  // eslint-disable-next-line
    return instanceGenerator(import.meta.env.VITE_APP_URL + '/v1/' + endpoint);
};
