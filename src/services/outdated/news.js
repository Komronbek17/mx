import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class News extends Core {
  constructor(url) {
    super(axiosV1, url);
  }
}

export default News;
