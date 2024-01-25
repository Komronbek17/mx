import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class BonusHistory extends Core {
  constructor(url) {
    super(axiosV1({ version: "" }), url);
  }

  fetchActiveBonuses(body) {
    return this.customPost("v2/package/api/history/list", body);
  }

  fetchSpecPrizes(body) {
    return this.customPost("/gtw/v2/level/winnings", body);
  }
}

export const bonusHistory = new BonusHistory();
