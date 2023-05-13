import Core from "@/services/axios/core.axios";

class HistoryService extends Core {
  constructor() {
    super({});
  }

  fetchRecentHistories(body) {
    return this.get("/histories/", body);
  }

  fetchPrizeHistories() {
    return this.get("/levels/histories/", {
      method: "coin.get_prize_histories",
      params: {
        page: 1,
        limit: 10,
      },
    });
  }

  fetchActiveHistories() {
    return this.post("/api/coin/histories/active/", {
      method: "coin.get_active_histories",
      params: {
        page: 1,
        limit: 10,
      },
    });
  }
}

export const historyApi = new HistoryService();
