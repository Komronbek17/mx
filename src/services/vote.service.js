import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class VoteService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ endpoint: "votes" }),
    });
  }

  fetchVotes() {
    return this.get("");
  }

  sendAnswers(body) {
    return this.post("/answers", body);
  }
}

export const voteApi = new VoteService();
