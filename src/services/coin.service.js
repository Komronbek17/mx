import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class CoinService extends Core {
  constructor() {
    super({
      axios: axiosVersion({ endpoint: "coin" }),
    });
  }

  getBalance() {
    return this.post("balance");
  }

  getAllProducts({
    method = "coin.get_all_products",
    params: { page = 1, limit = 100 },
  }) {
    return this.post("products", {
      method,
      params: { page, limit },
    });
  }

  getProduct({ method = "coin.get_product", params: { id = null } }) {
    return this.post("products/findOne", {
      method,
      params: { id },
    });
  }

  activateProduct(body) {
    return this.post("products/activation", body);
  }

  addressFindAll({ body: { page = 1, limit = 10 } }) {
    return this.post("address/findAll", { page, limit });
  }

  addressFinOne({ params: { id = null } }) {
    return this.post("address/findOne", {
      id,
    });
  }

  addressCreate({ body }) {
    return this.post("address", body);
  }

  addressUpdate({ body }) {
    return this.post("address/update", body);
  }

  addressRemove(id) {
    return this.post("address/remove", id);
  }

  basketFindAll({ body: { page = 1, limit = 10 } }) {
    return this.post("basket/findAll", { page, limit });
  }

  basketFindOne({ body: { id = null } }) {
    return this.post("basket/findOne", { id });
  }

  basketAddItem({ body: { product_id = null, quantity = null } }) {
    return this.post("basket/", { product_id, quantity });
  }

  basketUpdateItem({ body: { id = null, quantity = null } }) {
    return this.post("basket/update", { id, quantity });
  }

  basketRemoveItem({ body: { id = null } }) {
    return this.post("basket/remove", { id });
  }

  basketClearAllItems({ body: { id = null } }) {
    return this.post("basket/bulkRemove", { id });
  }

  clientFindAll({ body: { page = 1, limit = 10 } }) {
    return this.post("client/findAll", { page, limit });
  }

  clientFindOne({ body: { id = null } }) {
    return this.post("client/findOne", { id });
  }

  clientCreate({ body }) {
    return this.post("client", body);
  }

  clientUpdate({
    body: {
      id = null,
      first_name = null,
      last_name = null,
      passport = null,
      pinfl = null,
    },
  }) {
    return this.post("client/update", {
      first_name,
      last_name,
      passport,
      pinfl,
      id,
    });
  }

  clientRemove(id) {
    return this.post("client/remove", id);
  }

  orderItemFindAll({ body: { order_id = null, page = 1, limit = 10 } }) {
    return this.post("orderItem/findAll", { order_id, page, limit });
  }

  orderItemFindOne({ body: { id = null } }) {
    return this.post("orderItem/findOne", { id });
  }

  orderItemUpdateOne({ body }) {
    return this.post("orderItem/update", body);
  }

  orderItemRemoveOne({ body: { id = null } }) {
    return this.post("orderItem/remove", { id });
  }

  orderCreate({
    body: {
      address_id = null,
      client_detail_id = null,
      comment = null,
      basket_ids = [],
    },
  }) {
    return this.post("order", {
      address_id,
      client_detail_id,
      comment,
      basket_ids,
    });
  }

  orderFindAll({ body: { page = 1, limit = 10 } }) {
    return this.post("order/findAll", { page, limit });
  }

  orderFindOne({ body: { id = null } }) {
    return this.post("order/findOne", { id });
  }

  orderUpdateOne({
    body: { id = null, merchant_id = null, status = null, delivered_at = null },
  }) {
    return this.post("order/update", {
      id,
      status,
      merchant_id,
      delivered_at,
    });
  }

  orderRemoveOne({ body: { id = null } }) {
    return this.post("order/remove", { id });
  }

  transactionFindAll({ body }) {
    return this.post("transaction/findAll", body);
  }

  transactionTotal() {
    return this.post("transaction/total");
  }
}

export const coinApi = new CoinService();
