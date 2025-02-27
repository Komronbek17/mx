import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class ProfileService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ endpoint: "user/" }),
    });
  }

  fetchAvatars() {
    return this.get("avatars");
  }

  fetchMe() {
    return this.get("me");
  }
  fetchRegions() {
    return this.get("regions");
  }

  updateMe(body) {
    return this.put("me", body);
  }
}

export const profileApi = new ProfileService();
