import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class BonusV2 extends Core {
  constructor(url) {
    super(axiosV1({ endpoint: "api/", version: "v2" }), url);
  }

  dailyStatus() {
    return this.customPost("/daily/status");
  }

  dailyAppoint(body) {
    return this.customPost("daily/appoint", body);
  }

  premiumStatus() {
    return this.customPost("premium/status");
  }

  premiumAppoint(body) {
    return this.customPost("premium/appoint", body);
  }
}

export const bonusApiV2 = new BonusV2();
