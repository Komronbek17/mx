import Core from "@/services/axios/core.axios";
import { axiosV1 } from "@/services/axios/axios";

class SubscribeV2Service extends Core {
  constructor() {
    super({
      axios: axiosV1({
        version: "v2",
        endpoint: "subscription/api/subscriber",
      }),
    });
  }

  activate(body) {
    return this.post("/activate", body);
  }

  deactivate() {
    return this.post("/deactivate");
  }

  status() {
    return this.post("status");
  }
}

export const subscribeV2Api = new SubscribeV2Service();
