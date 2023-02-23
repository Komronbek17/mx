import Core from "@/services/axios/core.axios";

class HistoryService extends Core {
  constructor() {
    super({
      endpoint: "histories",
    });
  }

  fetchHistories({ params }) {
    return this.get("", { params });
  }
}

export const historyApi = new HistoryService();
