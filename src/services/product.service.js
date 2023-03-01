import Core from "@/services/axios/core.axios";

class ProductService extends Core {
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

export const productApi = new ProductService();
