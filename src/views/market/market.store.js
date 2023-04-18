import { computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useMarketStore = defineStore("market", () => {
  const basketThing = reactive({
    products: [],
  });

  const total = computed(() =>
    basketThing.products.reduce((acc, item) => {
      if (item?.isActive) {
        return acc + item?.quantity * item?.product?.price;
      }
      return acc;
    }, 0)
  );

  function findPIdx(idx) {
    return basketThing.products.findIndex((p) => p?.id === idx);
  }

  function initializeBasket({ products }) {
    basketThing.products = products.map((p) => ({ ...p, isActive: true }));
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
    basketThing,
    initializeBasket,
    updateBasketProduct,
    updateProductQuantity,
    inactivateBasketProduct,
  };
});
