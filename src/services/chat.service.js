import Core from "@/services/axios/core.axios";

class ChatService extends Core {
  constructor() {
    super({});
  }
}

export const chatApi = new ChatService();
