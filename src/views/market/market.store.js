import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { coinApi } from "@/services/coin.service";
import { toastErrorMessage } from "@/utils/error.util";

export const useMarketStore = defineStore("market", () => {
  const basketThing = reactive({
    products: [],
    summary: {
      total: 0,
      balance: 0,
    },
  });

  const total = computed(() =>
    basketThing.products.reduce((acc, item) => {
      if (item?.isActive && item["is_available"]) {
        return acc + item?.quantity * item?.product?.price;
      }
      return acc;
    }, 0)
  );

  const balance = computed(() => basketThing.summary.balance);

  const products = computed(() => basketThing.products);
  const availableProducts = computed(() =>
    basketThing.products.filter((p) => p["is_available"])
  );
  const hasAvailableProducts = computed(
    () => availableProducts.value.length > 0
  );
  const activeProducts = computed(() =>
    basketThing.products.filter((p) => p["isActive"])
  );

  function findPIdx(idx) {
    return basketThing.products.findIndex((p) => p?.id === idx);
  }

  function initializeBasket({ products, summary }) {
    basketThing.summary = summary;
    basketThing.products = products.map((p) => ({ ...p, isActive: true }));
  }

  async function fetchBasketItems() {
    try {
      const response = await coinApi.basketFindAll({
        body: { limit: 50 },
      });

      initializeBasket({
        summary: response.data.summary,
        products: response.data.products,
      });
    } catch (e) {
      toastErrorMessage(e);
    }
  }

  function setBasketProducts({ products }) {
    basketThing.products = products;
  }

  function updateBasketProduct({ product }) {
    const pIdx = findPIdx(product.id);
    if (pIdx !== -1) {
      basketThing.products.splice(pIdx, 1, product);
    } else {
      basketThing.products.push(product);
    }
  }

  function updateProductQuantity({ productId, quantity }) {
    const uPIdx = findPIdx(productId);
    if (uPIdx !== -1) {
      if (!quantity) {
        basketThing.products.splice(uPIdx, 1);
      } else {
        basketThing.products[uPIdx].quantity = quantity;
      }
    }
  }

  function inactivateBasketProduct({ productId }) {
    const uPIdx = findPIdx(productId);
    if (uPIdx !== -1) {
      basketThing.products[uPIdx].isActive =
        !basketThing.products[uPIdx].isActive;
    }
  }

  return {
    total,
    balance,
    products,
    basketThing,
    activeProducts,
    availableProducts,
    hasAvailableProducts,
    initializeBasket,
    setBasketProducts,
    fetchBasketItems,
    updateBasketProduct,
    updateProductQuantity,
    inactivateBasketProduct,
  };
});
