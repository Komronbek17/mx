import Core from "@/services/outdated/core/index";
import { axiosV1 } from "@/services/axios/axios";

class Auth extends Core {
  constructor(url) {
    super(axiosV1, url);
  }

  signInApi(credentials) {
    return this.post(credentials);
  }

  verifyNumberApi(credentials) {
    return this.customPost(this.url + "verify", credentials);
  }
}

export default Auth;
