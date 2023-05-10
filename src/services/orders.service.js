import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class OrdersService extends Core {
  constructor() {
    super({ axios: axiosVersion({}) });
  }

  fetchActiveOrders(body) {
    return this.post("/coin/order/findAll", body);
  }

  fetchOrdersHistory(body) {
    return this.post("/coin/order/findAll", body);
  }
}

export const ordersApi = new OrdersService();
