import Core from "@/services/axios/core.axios";

class LatestService extends Core {
  constructor() {
    super({
      endpoint: "",
    });
  }

  flash = {
    send: ({ body }) => this.post("flash/send", body),
    info: ({ id, params = {} } = { params: {} }) =>
      this.get(`flash/info/${id}`, { params }),
    panel: ({ id, params = {} } = { params: {} }) =>
      this.get(`flash/panel/${id}`, { params }),
  };
}

export const latest = new LatestService();
