import AppMarket from "@/views/market/AppMarket.vue";
import AppMarketProduct from "@/views/market/AppMarketProduct.vue";
import AppMarketForm from "@/views/market/AppMarketForm.vue";
import AppMarketDetails from "@/views/market/AppMarketDetails.vue";
import AppMarketPassport from "@/views/market/AppMarketPassport.vue";
import AppMarketBasket from "@/views/market/AppMarketBasket.vue";
import AppMarketAddressView from "@/views/market/AppMarketAddressView.vue";
import AppOrderedSuccessfully from "@/views/market/AppOrderedSuccessfully.vue";
import AppMarketMap from "@/views/market/AppMarketMap.vue";

export const marketRoutes = [
  {
    path: "/market",
    name: "market",
    component: AppMarket,
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
    path: "/market/basket",
    name: "basket",
    component: AppMarketBasket,
  },
  {
    path: "/checkout/addresses",
    name: "checkout-addresses",
    component: AppMarketAddressView,
  },
  {
    path: "/checkout/ordered",
    name: "ordered-successfully",
    component: AppOrderedSuccessfully,
  },
  {
    path: "/checkout-map",
    name: "checkout-map",
    component: AppMarketMap,
  },
];
