<script setup>
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import AppBasketProduct from "@/views/market/basket/BasketProduct.vue";
import { useI18n } from "vue-i18n";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";
import { useToast } from "vue-toastification";
import { reactive } from "vue";

const { t } = useI18n();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();

const basketStore = reactive({
  summary: {
    total: 0,
    balance: 0,
  },
  products: [],
});

async function getBasketItems() {
  try {
    startLoading();
    const response = await coinApi.basketFindAll({
      body: { limit: 50 },
    });

    console.log("response", response);
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  } finally {
    finishLoading();
  }
}

getBasketItems();
</script>

<template>
  <div class="basket">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div class="basket-title">
        <p>{{ t("market_page.your_order") }}</p>
        <router-link to="#">{{ t("market_page.change") }}</router-link>
      </div>

      <app-basket-product
        v-for="basketItem in basketStore.products"
        :key="basketItem.id"
        :basket-item="basketItem"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  background-color: var(--gf-basket-product-image-bg);
}

.basket {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    & p {
      @extend .text-15-600;
      color: var(--text-main);
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
</style>
