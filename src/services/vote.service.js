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

  checkExists(){
    return this.get("/question-exists");
  }

  sendAnswers(body) {
    return this.post("/answers", body);
  }
}

export const voteApi = new VoteService();
