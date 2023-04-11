import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

// class ProductService extends Core {
class CoinService extends Core {
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

  fetchProductsBasket(){
    return this.post("products/withBasket", body);
  }

  getProduct(body) {
    return this.post("products/findOne", body);
  }

  activateProduct(body) {
    return this.post("products/activation", body);
  }

  fetchAddresses(body) {
    return this.post("address/findAll", body);
  }

  // Basket
  getBasket(body) {
    return this.post("basket/findAll", body);
  }

  createAddress(body) {
    return this.post("address", body);
  }
}

export const coinApi = new CoinService();
