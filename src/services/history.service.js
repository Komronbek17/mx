import Core from "@/services/axios/core.axios";
import { axiosMock } from "@/services/axios/axios";

class HistoryService extends Core {
  constructor() {
    super({});
  }

  fetchRecentHistories(body) {
    return this.get("/histories/", body);
  }

  // fetchPrizeHistories() {
  //   return this.get("/levels/histories/", {
  //     method: "coin.get_prize_histories",
  //     params: {
  //       page: 1,
  //       limit: 10,
  //     },
  //   });
  // }
}

class HistoryMockService extends Core {
  constructor() {
    super({
      axios: axiosMock({
        endpoint: "v1/levels/",
      }),
    });
  }

  fetchPrizeHistories(body) {
    return this.get("histories/", body);
  }
}

export const historyApi = new HistoryService();
export const historyMockApi = new HistoryMockService();
