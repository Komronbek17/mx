import Core from "@/services/axios/core.axios";
import { axiosDevV2 } from "@/services/axios/axios";

class LevelV2Service extends Core {
  constructor() {
    super({
      axios: axiosDevV2({ endpoint: "gtw/v2/level" }),
    });
  }

  fetchLevels(body) {
    return this.post("findAll", body);
  }

  fetchLevelPrizes(body) {
    return this.post("prize/findAll", body);
  }

  getPrize(body) {
    return this.post("get-prize", body);
  }
}

export const levelV2Api = new LevelV2Service();
