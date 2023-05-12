import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class ReferralService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ version: "v1", endpoint: "referral/" }),
    });
  }

  getLink() {
    return this.post("link");
  }

  getRelatedReferrals(body) {
    return this.post("related-referrals", body);
  }
}

export const referralService = new ReferralService();
