import CoreAxios from "@/services/axios/core.axios";

class AuthService extends CoreAxios {
  constructor() {
    super({
      endpoint: "oauth/",
    });
  }

  login({ body = {} }) {
    return this.post("", body);
  }

  verify({ body }) {
    return this.post("verify", body);
  }

  logout({ body }) {
    return this.post("logout", body);
  }
}

export const authApi = new AuthService();
