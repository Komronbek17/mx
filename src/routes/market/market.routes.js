import router from "@/routes";
import { BASKET_PRODUCTS } from "@/constants";
import AppMarket from "@/views/market/views/Market.vue";
import AppMarketProduct from "@/views/market/AppMarketProduct.vue";
import AppMarketForm from "@/views/market/AppMarketForm.vue";
import AppMarketDetails from "@/views/market/AppMarketDetails.vue";
import AppMarketPassport from "@/views/market/AppMarketPassport.vue";
import AppMarketBasket from "@/views/market/views/Basket.vue";
import AppOrderedSuccessfully from "@/views/market/AppOrderedSuccessfully.vue";
import AppMarketMap from "@/views/market/AppMarketMap.vue";
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
    path: "/market/form",
    name: "market-form",
    component: AppMarketForm,
  },
  {
    path: "/market/details",
    name: "market-details",
    component: AppMarketDetails,
  },
  {
    path: "/market/passport",
    name: "market-passport",
    component: AppMarketPassport,
  },
  {
    path: "/checkout/ordered",
    name: "market-ordered-successfully",
    component: AppOrderedSuccessfully,
  },
  {
    path: "/checkout-map",
    name: "checkout-map",
    component: AppMarketMap,
  },
];
