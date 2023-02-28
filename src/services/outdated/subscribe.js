import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class Subscribe extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  getSubscriberStatusApi() {
    return this.get();
  }

  subscribeActivateApi() {
    return this.post();
  }

  subscribeStopApi() {
    return this.customPut(this.url);
  }
}

export default Subscribe;
