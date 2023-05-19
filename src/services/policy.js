import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class PolicyService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ endpoint: "" }),
    });
  }

  marketPolicy() {
    return this.post("policy/findMarketPolicy");
  }
}

export const policyApi = new PolicyService();
