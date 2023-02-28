import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class Telegram extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  loginTelegram(credentials) {
    return this.customPost(this.url + "login", credentials);
  }

  checkUserApi(payload) {
    return this.post(payload);
  }

  changeTelegramLanguageApi(payload) {
    return this.customPut(this.url + "language", payload);
  }
}

export default Telegram;
