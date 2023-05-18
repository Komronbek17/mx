import Core from "@/services/axios/core.axios";
import { axiosDev } from "@/services/axios/axios";

class PolicyService extends Core {
  constructor() {
    super({
      axios: axiosDev({ endpoint: "" }),
    });
  }

  marketPolicy() {
    return this.post("policy/findMarketPolicy");
  }
}

export const policyApi = new PolicyService();
