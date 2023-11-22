import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class InformersService extends Core {
  constructor() {
    super({ axios: axiosVersion({}) });
  }

  fetchInformers(body) {
    return this.post("/award/findAll", body);
  }

  fetchActions(body) {
    return this.post("/awardType/findAll", body);
  }

  fetchChannelLink() {
    return this.post("/ads-channel/getLink");
  }
}

export const informersApi = new InformersService();
