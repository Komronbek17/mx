import Core from "@/services/axios/core.axios";
import { axiosV1 } from "@/services/axios/axios";

class ReferralService extends Core {
  constructor() {
    super({
      axios: axiosV1({ endpoint: "api/referral/" }),
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
