import Core from "@/services/axios/core.axios";

class ContentService extends Core {
  constructor() {
    super({
      endpoint: "",
    });
  }

  guides() {
    return this.get("content/guides");
  }

  policy() {
    return this.get("content/policy");
  }

  prizes() {
    return this.get("content/prizes");
  }

  socials() {
    return this.get("content/socials");
  }
}

export const contentApi = new ContentService();
