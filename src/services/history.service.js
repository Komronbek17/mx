import Core from "@/services/axios/core.axios";
import { axiosDev } from "@/services/axios/axios";

class HistoryService extends Core {
  constructor() {
    super({
      axios: axiosDev({}),
    });
  }

  fetchRecentHistories() {
    return this.post("api/coin/histories/active", {
      method: "coin.get_active_histories",
      params: {
        page: 1,
        limit: 10,
      },
    });
  }
}

export const historyApi = new HistoryService();
