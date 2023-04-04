<script setup>
import { WebAppController } from "@/utils/telegram/web.app.util";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { productApi } from "@/services/product.service";
import { loadingComposable } from "@/composables/loading.composable";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

async function showOrderProducts() {
  console.log(1);
}

MainButtonController.run();
MainButtonController.setText(`${t("market_page.show_order")}`);
MainButtonController.setBackgroundColor("#01E075");
MainButtonController.onClick(showOrderProducts);

onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
});

const product = ref({});

async function fetchProduct() {
  try {
    const body = {
      method: "coin.get_product",
      params: route.params,
    };
    const { data } = await productApi.getProduct(body);
    console.log(data, "data");
    product.value = data.result;
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  startLoading();
  try {
    await fetchProduct();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="market-product">
    <div class="market-product__image">
      <img
        v-if="product.images && product.images.length"
        :src="product?.images[0].path"
        alt=""
      />
    </div>
    <div class="layout-container">
      <div class="market-product__top">
        <p class="market-product__title">{{ product.name }}</p>
        <div class="market-product__price">
          <img src="@/assets/images/coin.png" alt="" />
          <p>{{ product.price }}</p>
        </div>
      </div>
      <p class="market-product__amount">
        {{ t("market_page.quantity") }}:
        <span>{{ product.qty }} {{ product["measurement"]?.name }}</span>
      </p>
      <p class="market-product__description-title">
        {{ t("market_page.description") }}
      </p>
      <p class="market-product__description">
        {{ product.description }}
      </p>
      <button class="market-product__btn">
        <img src="@/assets/images/add.svg" alt="" />
        <p>{{ t("market_page.to_basket") }}</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "market-product-styles.scss";
</style>
