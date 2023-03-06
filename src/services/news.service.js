import Core from "@/services/axios/core.axios";
import { axiosDev, axiosGoldFish, axiosV1 } from "@/services/axios/axios";

class NewsService extends Core {
  constructor() {
    super({
      axios: axiosDev({ endpoint: "api/news/" }),
    });
  }

    fetchNews(body) {
        return this.post("findAll", body);
    }

    fetchOneNews(body) {
        return this.post("findOne", body);
    }

    setLike(body) {
        return this.post("like", body);
    }

    setDislike(body) {
        return this.post('dislike', body);
    }
}

export const newsApi = new NewsService();
