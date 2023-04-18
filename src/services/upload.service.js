import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class UploadService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ endpoint: "uploads" }),
    });
  }

  uploadPassport({ body, config }) {
    return this.post("passports", body, config);
  }
}

export const uploadApi = new UploadService();
