import AppMarket from "@/views/market/views/Market.vue";
import AppMarketProduct from "@/views/market/AppMarketProduct.vue";
import AppMarketForm from "@/views/market/AppMarketForm.vue";
import AppMarketDetails from "@/views/market/AppMarketDetails.vue";
import AppMarketPassport from "@/views/market/AppMarketPassport.vue";
import AppMarketBasket from "@/views/market/views/Basket.vue";
import AppOrderedSuccessfully from "@/views/market/AppOrderedSuccessfully.vue";
import AppMarketMap from "@/views/market/AppMarketMap.vue";
import Checkout from "@/views/market/views/Checkout.vue";
import AddressCreate from "@/views/market/views/AddressCreate.vue";

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
  },
  {
    path: "/market/checkout/address/create",
    name: "checkout-address-create",
    component: AddressCreate,
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
    name: "ordered-successfully",
    component: AppOrderedSuccessfully,
  },
  {
    path: "/checkout-map",
    name: "checkout-map",
    component: AppMarketMap,
  },
];
