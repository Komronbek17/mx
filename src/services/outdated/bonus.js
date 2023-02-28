import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";
class Bonus extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  getDailyBonusApi(method) {
    if (method === "get") {
      return this.customGet(this.url);
    }
    if (method === "post") {
      return this.customPost(this.url);
    }
  }

  getPremiumBonusApi(method, packageType) {
    if (method === "get") return this.customGet(this.url + "premium");
    else if (method === "post")
      return this.customPost(this.url + "premium", {
        type: packageType,
      });
  }
}

export default Bonus;
