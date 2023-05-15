import Core from "@/services/axios/core.axios";
import { axiosV1 } from "@/services/axios/axios";

class OrdersService extends Core {
  constructor() {
    super({ axios: axiosV1({}) });
  }

  fetchActiveOrders(body) {
    return this.post("/coin/order/findAll", body);
  }

  fetchOrdersHistory(body) {
    return this.post("/coin/order/findAll", body);
  }
}

export const ordersApi = new OrdersService();
