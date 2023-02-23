import Core from "@/services/axios/core.axios";

class SubscribeService extends Core {
  constructor() {
    super({
      endpoint: "subscribe",
    });
  }

  fetchStatus() {
    return this.get("");
  }

  subscribeActivate() {
    return this.post("");
  }

  subscribeStop() {
    return this.put("");
  }
}

export const subscribeApi = new SubscribeService();
