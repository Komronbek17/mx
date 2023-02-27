import router from "@/routes";
import { getToken } from "@/utils/auth.util";
import { getLocalStorageVariable } from "@/utils/localstorage.util";

export function axiosRequestInterceptResponse(config) {
  const requestConfig = Object.assign({}, config);
  if (!config.headers["Authorization"] && config.url !== "login") {
    requestConfig.headers["Authorization"] = `Bearer ${getToken()}`;
  }

  requestConfig.headers["Accept-Language"] =
    getLocalStorageVariable("lang") || "uz";
  requestConfig.headers["Accept-App"] = "Web-telegram";

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
