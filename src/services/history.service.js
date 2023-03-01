import Core from "@/services/axios/core.axios";

class HistoryService extends Core {
  constructor() {
    super({});
  }

  fetchRecentHistories() {
    return this.get("/histories/", {
      method: "coin.get_recent_histories",
      params: {
        page: 1,
        limit: 10,
      },
    });
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
}

export const historyApi = new HistoryService();
