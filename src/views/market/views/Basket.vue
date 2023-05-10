<script setup>
import { computed, watch } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { coinApi } from "@/services/coin.service";
import { BASKET_PRODUCTS, BASKET_TOTAL_PRICE } from "@/constants";
import { useMarketStore } from "@/views/market/market.store";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { sessionStorageController } from "@/utils/localstorage.util";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import AppBasketProduct from "@/views/market/elements/BasketProduct.vue";
import EmptyBasket from "@/views/market/elements/EmptyBasket.vue";

const { t } = useI18n();
const router = useRouter();
const marketStore = useMarketStore();
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();

const isBalanceInsufficient = computed(
  () => marketStore.total > marketStore.balance
);

async function getBasketItems() {
  try {
    startLoading();
    const response = await coinApi.basketFindAll({
      body: { limit: 50 },
    });

    marketStore.initializeBasket({
      summary: response.data.summary,
      products: response.data.products,
    });
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  } finally {
    finishLoading();
  }
}

function openCheckoutPage() {
  if (!isBalanceInsufficient.value) {
    router.push({
      name: "market-checkout",
    });
  }
}

watch(
  () => marketStore.total,
  (total) => {
    if (total) {
      MainButtonController.run();
      MainButtonController.setText("Оформить выбранные товары");
      MainButtonController.onClick(openCheckoutPage);
    } else {
      MainButtonController.deactivate();
    }

    sessionStorageController.set(BASKET_TOTAL_PRICE, JSON.stringify(total));
    sessionStorageController.set(
      BASKET_PRODUCTS,
      JSON.stringify(marketStore.products)
    );
  },
  {
    immediate: true,
  }
);

WebAppController.ready();

getBasketItems();

onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(openCheckoutPage);
});
</script>

<template>
  <div class="basket">
    <app-loader :active="isFetching" />

    <template v-if="marketStore.basketThing.products.length">
      <div class="layout-container">
        <div class="basket-title">
          <p>{{ t("market_page.your_order") }}</p>
        </div>

        <app-basket-product
          :key="basketItem.id"
          :basket-item="basketItem"
          v-for="basketItem in marketStore.basketThing.products"
          @update-quantity="marketStore.updateProductQuantity"
          @inactivate-product="marketStore.inactivateBasketProduct"
        />
      </div>

      <div class="basket-summary">
        <div class="flex justify-between basket-summary-total">
          <h3>{{ $t("market_page.total_payment") }}:</h3>
          <p
            class="yellow-gradient-color flex align-center basket-summary-price"
          >
            <img
              :width="24"
              :height="24"
              src="@/assets/images/coin.png"
              alt="coin png"
            />
            <span class="ml-0-5">
              {{ marketStore.total }}
            </span>
          </p>
        </div>
        <template v-if="isBalanceInsufficient">
          <div class="basket-summary-total" style="color: red">
            {{ t("market_page.not_enough_money") }}
          </div>
          <div class="flex justify-between basket-summary-total">
            <h3 class="">{{ t("market_page.your_balance") }}:</h3>
            <p
              class="yellow-gradient-color flex align-center basket-summary-price"
            >
              <img
                :width="24"
                :height="24"
                src="@/assets/images/coin.png"
                alt="coin png"
              />
              <span class="ml-0-5">
                {{ marketStore.balance }}
              </span>
            </p>
          </div>
        </template>
      </div>
    </template>

    <empty-basket v-else />
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  background-color: var(--gf-bg-main);
  position: relative;
  padding-bottom: 72px;
  min-height: calc(100vh - 204px);
}

.basket {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    & p {
      @extend .text-15-600;
      color: var(--gf-text-33);
      text-transform: uppercase;
    }

    & a {
      @extend .text-15-600;
      display: block;
      background: var(--gradient-green);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  &-product {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid var(--accent-gray);

    &:last-child {
      border-bottom: none;
    }

    &__image {
      min-width: 44px;
      width: 44px;
      height: 32px;
      padding: 6px 0;
      background: var(--accent-gray);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      margin-right: 1rem;

      & img {
        height: 100%;
        object-fit: contain;
      }
    }

    &__details {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__name {
      @extend .text-15-600;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    &__model {
      @extend .text-14-400;
      color: var(--text-secondary);
    }

    &__price {
      display: flex;
      align-items: center;

      & img {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin-right: 8px;
      }

      & span {
        display: block;
        @extend .text-14-500;
        color: var(--accent-yellow);
      }
    }
  }
}

.basket-summary {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--gf-bg-main);
  //border-top: 1px solid #f5f5f5;
  border-radius: 16px 16px 0 0;

  .basket-summary-total {
    padding: 0.75rem 1rem;
    color: var(--gf-text-33);
  }

  .basket-summary-price {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
  }
}
</style>
