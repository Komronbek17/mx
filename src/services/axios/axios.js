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
  version,
  endpoint = "",
  baseUrl = import.meta.env.VITE_APP_DEV_VR,
}) => {
  return instanceGenerator(baseUrl + `api/` + endpoint);
};

export const axiosV1 = ({ endpoint = "" }) => {
  // eslint-disable-next-line
    return instanceGenerator(import.meta.env.VITE_APP_URL + '/v1/' + endpoint);
};

export const axiosMock = ({ endpoint = "" }) => {
  // eslint-disable-next-line
    return instanceGenerator(import.meta.env.VITE_APP_MOCK_API + '/' + endpoint);
};
