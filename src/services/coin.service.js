import Core from "@/services/axios/core.axios";

class CoinService extends Core {
  constructor() {
    super({
      endpoint: "api/coin",
    });
  }
}

export const coinApi = new CoinService();
