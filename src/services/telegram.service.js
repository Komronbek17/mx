import CoreAxios from "@/services/axios/core.axios";

class TelegramService extends CoreAxios {
  constructor() {
    super({
      endpoint: "telegram/",
    });
  }

  async authJwt({ telegram_id }) {
    return this.post("", {
      telegram_id,
    });
  }

  login({ body }) {
    return this.post("login", body);
  }

  switchLanguage({ body }) {
    return this.put("language", body);
  }
}

export const telegramApi = new TelegramService();
