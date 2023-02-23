import Core from "@/services/axios/core.axios";

class InfoService extends Core {
  constructor() {
    super({
      endpoint: "info",
    });
  }

  fetchUserInfo() {
    return this.get("user");
  }

  fetchGamePortal() {
    return this.get("game");
  }

  fetchDaily() {
    return this.get("daily");
  }

  fetchPremium() {
    return this.get("premium");
  }
}

export const infoApi = new InfoService();
