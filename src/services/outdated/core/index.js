class Core {
  constructor(axios, url) {
    this._axios = axios;
    this.url = url;
  }

  get(params) {
    return this._axios
      .get(this.url, { params })
      .catch((error) => Promise.reject(error));
  }

  customGet(url, params) {
    return this._axios
      .get(url, { params })
      .catch((error) => Promise.reject(error));
  }

  getSingle(id, params) {
    return this._axios
      .get(`${this.url}/${id}`, { params })
      .catch((error) => Promise.reject(error));
  }

  customGetSingle(url, params) {
    return this._axios
      .get(url, { params })
      .catch((error) => Promise.reject(error));
  }

  post(body = {}, params) {
    return this._axios
      .post(this.url, body, { ...params })
      .catch((error) => Promise.reject(error));
  }

  customPost(url, body = {}, params) {
    return this._axios
      .post(url, body, { ...params })
      .catch((error) => Promise.reject(error));
  }

  updateByPost(id, body = {}, params) {
    return this._axios
      .post(`${this.url}/${id}`, body, { ...params })
      .catch((error) => Promise.reject(error));
  }

  put(id, body = {}) {
    return this._axios
      .put(`${this.url}/${id}`, body)
      .catch((error) => Promise.reject(error));
  }

  customPut(url, body = {}) {
    return this._axios.put(url, body).catch((error) => Promise.reject(error));
  }

  delete(id) {
    return this._axios
      .delete(`${this.url}/${id}`)
      .catch((error) => Promise.reject(error));
  }

  customDelete(url) {
    return this._axios.delete(url).catch((error) => Promise.reject(error));
  }
}

export default Core;
