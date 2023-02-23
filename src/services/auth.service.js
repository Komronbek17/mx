import Core from "@/services/axios/core.axios";

class AuthService extends Core {
  constructor() {
    super({
      endpoint: "oauth",
    });
  }

  login() {
    return this.post("");
  }

  verify() {
    return this.post("verify");
  }

  logout({ body }) {
    return this.post("logout", body);
  }
}

export const authApi = new AuthService();
