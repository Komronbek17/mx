import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";
class History extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  getHistoriesApi() {
    return this.get();
  }
}

export default History;
