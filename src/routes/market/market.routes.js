import router from "@/routes";
import { BASKET_PRODUCTS } from "@/constants";
import AppMarket from "@/views/market/views/Market.vue";
import AppMarketProduct from "@/views/market/views/AppMarketProduct.vue";
import AppMarketBasket from "@/views/market/views/Basket.vue";
import AppOrderedSuccessfully from "@/views/market/views/AppOrderedSuccessfully.vue";
import Checkout from "@/views/market/views/Checkout.vue";
import AddressUpsert from "@/views/market/views/AddressUpsert.vue";
import ClientUpsert from "@/views/market/views/ClientUpsert.vue";
import { sessionStorageController } from "@/utils/localstorage.util";

export const marketRoutes = [
  {
    path: "/market",
    name: "market",
    component: AppMarket,
  },
  {
    path: "/market/basket",
    name: "market-basket",
    component: AppMarketBasket,
  },
  {
    path: "/market/checkout",
    name: "market-checkout",
    component: Checkout,
    beforeEnter: async (to, from) => {
      const sessionProducts = sessionStorageController.get(BASKET_PRODUCTS);
      const products = sessionProducts ? JSON.parse(sessionProducts) : [];
      if (products.length) {
        return true;
      }

      if (from.name === "market-basket") {
        return true;
      } else {
        return await router.push({
          name: "market-basket",
        });
      }
    },
  },
  {
    path: "/market/checkout/address/create",
    name: "checkout-address-create",
    component: AddressUpsert,
  },
  {
    path: "/market/checkout/address/:id/update",
    name: "checkout-address-update",
    component: AddressUpsert,
  },
  {
    path: "/market/checkout/client/create",
    name: "checkout-client-create",
    component: ClientUpsert,
  },
  {
    path: "/market/checkout/client/:id/update",
    name: "checkout-client-update",
    component: ClientUpsert,
  },
  {
    path: "/market/product/:id",
    name: "market-product",
    component: AppMarketProduct,
  },
  {
    path: "/checkout/ordered",
    name: "market-ordered-successfully",
    component: AppOrderedSuccessfully,
  },
];
