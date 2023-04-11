import Core from "@/services/axios/core.axios";

class CoinService extends Core {
  constructor() {
    super({
      endpoint: "api/coin",
    });
  }

  balance() {
    return this.post("balance");
  }

  getAllProducts({
    method = "coin.get_all_products",
    params = { page: 1, limit: 10 },
  }) {
    return this.post("products", {
      method,
      params,
    });
  }

  getProduct({ method = "coin.get_product", params = { id: null } }) {
    return this.post("products/findOne", {
      method,
      params,
    });
  }

  addressFindAll({ params = { page: 1, limit: 10 } }) {
    return this.post("address/findAll", {
      params,
    });
  }

  addressFinOne({ params = { id: null } }) {
    return this.post("address/findOne", {
      params,
    });
  }

  addressCreate({ body }) {
    return this.post("address", body);
  }

  addressUpdate({ body }) {
    return this.post("address/update", body);
  }

  addressRemove({ body = { id: null } }) {
    return this.post("address/remove", body);
  }

  basketFindAll({ body = { page: 1, limit: 10 } }) {
    return this.post("basket/findAll", body);
  }

  basketFindOne({ body = { id: null } }) {
    return this.post("basket/findOne", body);
  }

  basketAddItem({ body = { product_id: null, quantity: null } }) {
    return this.post("basket/create", body);
  }

  basketUpdateItem({ body = { id: null, quantity: null } }) {
    return this.post("basket/update", body);
  }

  basketRemoveItem({ body = { id: null } }) {
    return this.post("basket/remove", body);
  }

  basketClearAllItems({ body = { id: null } }) {
    return this.post("basket/bulkRemove", body);
  }

  clientFindAll({ body = { page: 1, limit: 10 } }) {
    return this.post("client/findAll", body);
  }

  clientFindOne({ body = { id: null } }) {
    return this.post("client/findOne", body);
  }

  clientCreate({
    body = {
      first_name: null,
      last_name: null,
      birthdate: null,
      passport: null,
      pinfl: null,
    },
  }) {
    return this.post("client/create", body);
  }

  clientUpdate({
    body = {
      id: null,
      first_name: null,
      last_name: null,
      birthdate: null,
      passport: null,
      pinfl: null,
    },
  }) {
    return this.post("client/update", body);
  }

  clientRemove({ body = { id: null } }) {
    return this.post("client/remove", body);
  }

  orderItemFindAll({ body = { order_id: null, page: 1, limit: 10 } }) {
    return this.post("orderItem/findAll", body);
  }

  orderItemFindOne({ body = { id: null } }) {
    return this.post("orderItem/findOne", body);
  }

  orderItemUpdateOne({ body }) {
    return this.post("orderItem/update", body);
  }

  orderItemRemoveOne({ body = { id: null } }) {
    return this.post("orderItem/remove", body);
  }

  orderCreate({
    body = {
      address_id: null,
      client_detail_id: null,
      comment: null,
      basket_ids: [],
    },
  }) {
    return this.post("order", body);
  }

  orderFindAll({ body = { page: 1, limit: 10 } }) {
    return this.post("order/findAll", body);
  }

  orderFindOne({ body = { id: null } }) {
    return this.post("order/findOne", body);
  }

  orderUpdateOne({
    body = {
      id: null,
      merchant_id: null,
      status: null,
      delivered_at: null,
    },
  }) {
    return this.post("order/update", body);
  }

  orderRemoveOne({ body = { id: null } }) {
    return this.post("order/remove", body);
  }
}

export const coinApi = new CoinService();
