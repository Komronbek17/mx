import Core from "@/services/axios/core.axios";
import { axiosV1 } from "@/services/axios/axios";

class NotificationService extends Core {
  constructor() {
    super({
      axios: axiosV1({ version: "gtw/v2", endpoint: "notification/" }),
    });
  }

  getAll(body) {
    return this.post("findAll", body);
  }

  getOne(body) {
    return this.post("findOne", body);
  }
}

export const notificationApi = new NotificationService();
