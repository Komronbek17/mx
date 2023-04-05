import CoreAxios from "@/services/axios/core.axios";

class TelegramService extends CoreAxios {
  constructor() {
    super({
      endpoint: "telegram/",
    });
  }

  async authJwt(body) {
    return this.post("", body);
  }

  login({ body }) {
    return this.post("login", body);
  }

  switchLanguage({ body }) {
    return this.put("language", body);
  }
}

export const telegramApi = new TelegramService();
