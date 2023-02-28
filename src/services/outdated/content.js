import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";
class Content extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  getPolicyApi() {
    return this.customGet(this.url + "policy");
  }
}

export default Content;
