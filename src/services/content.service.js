import Core from "@/services/axios/core.axios";

class ContentService extends Core {
  constructor() {
    super({
      endpoint: "content",
    });
  }

  guides() {
    return this.get("guides");
  }

  policy() {
    return this.get("policy");
  }

  prizes() {
    return this.get("prizes");
  }

  socials() {
    return this.get("socials");
  }
}

export const contentApi = new ContentService();
