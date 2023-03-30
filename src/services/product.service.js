import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class ProductOldService extends Core {
  constructor() {
    super({
      endpoint: "coin/",
    });
  }

  fetchProducts(body) {
    return this.post("products", body);
  }

  getBalance() {
    return this.post("balance");
  }

  activateProduct(body) {
    return this.post("products/activation", body);
  }

  setDailyGift() {
    return this.post("");
  }

  fetchPremiumLampInfo() {
    return this.get("premium");
  }

  setPremiumLampGift() {
    return this.post("premium");
  }
}

class ProductService extends Core {
  constructor() {
    super({
      endpoint: "coin/",
      axios: axiosVersion({ version: "v2", endpoint: "coin/" }),
    });
  }

  getBalance() {
    return this.post("balance");
  }

  fetchProducts(body) {
    return this.post("products", body);
  }
}

export const productApi = new ProductService();
