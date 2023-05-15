import Core from "@/services/axios/core.axios";
import { axiosDev } from "@/services/axios/axios";

class OrdersService extends Core {
  constructor() {
    super({ axios: axiosDev({}) });
  }

  fetchActiveOrders(body) {
    return this.post("/coin/order/findAll", body);
  }

  fetchOrdersHistory(body) {
    return this.post("/coin/order/findAll", body);
  }
}

export const ordersApi = new OrdersService();
