import { axiosV1 } from "@/services/axios/axios";

class CoreAxios {
  constructor({ axios = null, endpoint = "" }) {
    if (axios) {
      this._axios = axios;
    } else {
      this._axios = axiosV1({ endpoint });
    }
  }

  get(url, config) {
    return this._axios.get(url, config).catch((error) => Promise.reject(error));
  }

  post(url, body = {}, config) {
    return this._axios
      .post(url, body, {
        ...config,
      })
      .catch((error) => Promise.reject(error));
  }

  put(url, body = {}) {
    return this._axios.put(url, body).catch((error) => Promise.reject(error));
  }

  delete(url) {
    return this._axios.delete(url).catch((error) => Promise.reject(error));
  }

  findAll({ params = {} }) {
    return this.post("/findAll", params);
  }

  findOne({ params = {} }) {
    return this.post("/findOne", params);
  }

  create({ params = {} }) {
    return this.post("", params);
  }

  update({ params = {} }) {
    return this.post("/update", params);
  }

  remove({ params = {} }) {
    return this.post("/remove", params);
  }
}

export default CoreAxios;
