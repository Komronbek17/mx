import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class ChatService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ endpoint: "chats" }),
    });
  }

  messages({ params }) {
    return this.get("messages", {
      params,
    });
  }

  writeMessage({ body }) {
    return this.post("messages", body);
  }

  editMessage({ messageId }) {
    return this.put(`updateMessage/${messageId}`);
  }

  removeMessage({ messageId }) {
    return this.put(`removeMessage/${messageId}`);
  }

  upload({ body }) {
    return this.post("upload", { body });
  }
}

export const chatApi = new ChatService();
