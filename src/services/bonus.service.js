import Core from "@/services/axios/core.axios";

class BonusService extends Core {
  constructor() {
    super({
      endpoint: "gifts/",
    });
  }

  fetchDailyLamp() {
    return this.get("");
  }

  setDailyGift() {
    return this.post("");
  }

  fetchPremiumLampInfo() {
    return this.get("premium");
  }

  setPremiumLampGift() {
    return this.post("premium");
  }
}

export const bonusApi = new BonusService();
