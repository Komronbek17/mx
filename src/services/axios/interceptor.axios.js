import router from "@/routes";
import { getToken } from "@/utils/auth.util";

export function axiosRequestInterceptResponse(config) {
  const lang = localStorage.getItem("locale");
  const requestConfig = Object.assign({}, config);
  if (!config.headers["Authorization"] && config.url !== "oauth/login") {
    requestConfig.headers["Authorization"] = `Bearer ${getToken()})}`;
  }

  requestConfig.headers["Accept-Language"] = lang || "ru";

  return requestConfig;
}

export async function axiosResponseInterceptorError(error) {
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      if (router.currentRoute["name"] !== "login") {
        return await router.push({
          name: "login",
        });
      }
    }
  }

  return Promise.reject(error);
}
