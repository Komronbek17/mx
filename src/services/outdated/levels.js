import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class Levels extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  getLevelsApi() {
    return this.customGet(this.url + "/float");
  }

  getLevelsInformationApi(id) {
    return this.getSingle(id);
  }

  postRequestToGetPrizeApi(id) {
    return this.customPost(this.url + "/" + id);
  }

  getLevelsHistoryApi() {
    return this.customGet(this.url + "/histories");
  }
}

export default Levels;
