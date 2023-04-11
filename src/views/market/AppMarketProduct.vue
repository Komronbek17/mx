<script setup>
import {WebAppController} from "@/utils/telegram/web.app.util";
import {MainButtonController} from "@/utils/telegram/main.button.controller";
import {useI18n} from "vue-i18n";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {coinApi} from "@/services/coin.service";
import {loadingComposable} from "@/composables/loading.composable";

import {Pagination} from 'swiper';
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {useToast} from "vue-toastification";

const modules = [Pagination]

const {t} = useI18n();

const toast = useToast()
const route = useRoute();
const router = useRouter();

const {startLoading, finishLoading} = loadingComposable();

async function showOrderProducts() {
  console.log(1);
}


const product = ref({});
const basket = ref([]);

async function fetchProduct() {
  try {
    const params = {
      id: route.params.id
    }
    const {data} = await coinApi.getProduct({params});
    product.value = data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
}

async function fetchBasket() {
  try {
    const body = {
      page: 1,
      limit: 100,
    };
    const {data} = await coinApi.getBasket(body);
    basket.value = data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
}

if (basket && basket.value.products && basket.value.products.length) {
  MainButtonController.run();
  MainButtonController.setBackgroundColor("#555333");
} else {
  MainButtonController.run();
}


MainButtonController.setText(`${t("market_page.show_order")}`);
MainButtonController.setBackgroundColor("#01E075");
MainButtonController.onClick(showOrderProducts);

onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
});


onMounted(async () => {
  startLoading();
  try {
    await fetchProduct();
    await fetchBasket();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="market-product">
    <swiper
        :pagination="{
          dynamicBullets: true,
        }"
        :modules="modules"
        :slides-per-view="1"
        :space-between="16"
        class="market-product__image"
    >
      <swiper-slide v-for="image in product.images" :key="image.id">
        <img
            :src="image?.path || '@/assets/images/no-photo.svg'"
            alt=""
        />
      </swiper-slide>
    </swiper>
    <div class="layout-container">
      <div class="market-product__top">
        <p class="market-product__title">{{ product.name }}</p>
        <div class="market-product__price">
          <img src="@/assets/images/coin.png" alt=""/>
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
        <img src="@/assets/images/add.svg" alt=""/>
        <p>{{ t("market_page.to_basket") }}</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "market-product-styles.scss";
</style>
