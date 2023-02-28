import axios from "axios";
import {
  axiosResponseInterceptorError,
  axiosRequestInterceptResponse,
} from "@/utils/axios-intercept";
import { ref } from "vue";

export const requestPending = ref();

const instanceGenerator = (baseUrl) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.request.use(axiosRequestInterceptResponse, (error) =>
    Promise.reject(error)
  );

  instance.interceptors.response.use((response) => {
    requestPending.value = false;
    return response;
  }, axiosResponseInterceptorError);
  return instance;
};

export const axiosInstance = instanceGenerator(process.env.VUE_APP_URL);
export const axiosInstance2 = instanceGenerator();
