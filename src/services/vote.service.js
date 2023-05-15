import Core from "@/services/axios/core.axios";
import { axiosDev } from "@/services/axios/axios";

class VoteService extends Core {
  constructor() {
    super({
      axios: axiosDev({ endpoint: "votes" }),
    });
  }

  fetchVotes() {
    return this.get("");
  }

  checkExists() {
    return this.get("/question-exists");
  }

  sendAnswers(body) {
    return this.post("/answers", body);
  }
}

export const voteApi = new VoteService();
