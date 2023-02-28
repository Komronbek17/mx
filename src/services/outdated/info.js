import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class Info extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  getUserInfoApi() {
    return this.customGet(this.url + "user");
  }

  getDailyInfoApi() {
    return this.customGet(this.url + "daily");
  }

  getPremiumInfoApi() {
    return this.customGet(this.url + "premium");
  }
}

export default Info;
