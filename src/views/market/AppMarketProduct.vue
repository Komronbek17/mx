<script setup>
import { WebAppController } from "@/utils/telegram/web.app.util";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";
import AppSpinnerLoader from "@/components/elements/loader/AppSpinnerLoader.vue";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { useToast } from "vue-toastification";

const modules = [Pagination];

const { t } = useI18n();

const toast = useToast();
const route = useRoute();

const { startLoading, finishLoading } = loadingComposable();

async function showOrderProducts() {
  console.log(1);
}

const product = ref({});
const basket = ref([]);

async function fetchProduct() {
  try {
    const params = {
      id: route.params.id,
    };
    const { data } = await coinApi.getProduct({ params });
    product.value = data.result;
    marketProduct.card = data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
}

let marketProduct = reactive({
  card: {},
});

// async function fetchBasket() {
//   try {
//     const body = {
//       page: 1,
//       limit: 100,
//     };
//     const { data } = await coinApi.(body);
//     basket.value = data.result;
//   } catch (e) {
//     toast.error(e?.response?.data?.message);
//   }
// }

if (basket.value && basket.value.products && basket.value.products.length) {
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

const {
  loading: isSavingToBasket,
  startLoading: startSaving,
  finishLoading: finishSaving,
} = loadingComposable();

const {
  loading: isBasketUpdating,
  startLoading: startBasketUpdating,
  finishLoading: finishBasketUpdating,
} = loadingComposable();

const basketId = computed(() => marketProduct.card?.basket?.id ?? null);
const isProductType = computed(() => marketProduct.card.type === "product");
const savedInBasket = computed(
  () =>
    isProductType.value &&
    marketProduct.card &&
    marketProduct.card.basket &&
    marketProduct.card.basket.product_id === marketProduct.card.id
);
const limitQuantity = computed(() => marketProduct.card.qty);
const isBasketQtyFull = computed(
  () => limitQuantity.value === marketProduct.card.basket.quantity
);

async function addToBasket({ quantity = 1 }) {
  if (isSavingToBasket.value) {
    return;
  }

  try {
    startSaving();
    const response = await coinApi.basketAddItem({
      body: {
        quantity,
        product_id: marketProduct.card["id"],
      },
    });
    marketProduct.card.basket = {
      ...response.data.result,
      product_id: response.data.result.product.id,
    };
    marketProduct.card.basket.quantity = quantity;
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message);
  } finally {
    finishSaving();
  }
}

async function increaseBasketItem({ count = 1 }) {
  if (isBasketUpdating.value) {
    return;
  }

  try {
    startBasketUpdating();
    if (limitQuantity.value >= marketProduct.card?.basket.quantity + count) {
      await addToBasket({
        quantity: marketProduct.card?.basket.quantity + count,
      });
    }
  } catch (e) {
    marketProduct.card.basket.quantity -= count;
    toast.error(e.response?.data?.message ?? e.message);
  } finally {
    finishBasketUpdating();
  }
}

async function decreaseBasketItem({ count = -1 }) {
  if (isBasketUpdating.value) {
    return;
  }

  const basket = Object.assign(marketProduct.card.basket);
  try {
    startBasketUpdating();

    if (marketProduct.card?.basket.quantity + count === 0) {
      await coinApi
        .basketRemoveItem({
          body: {
            id: basketId.value,
          },
        })
        .then(() => {
          marketProduct.card.basket = null;
        });
    } else {
      await addToBasket({
        quantity: marketProduct.card?.basket.quantity + count,
      });
    }
  } catch (e) {
    marketProduct.card.basket = basket;
    marketProduct.card.basket.quantity -= count;
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishBasketUpdating();
  }
}

onMounted(async () => {
  startLoading();
  try {
    await fetchProduct();
    // await fetchBasket();
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
        <img :src="image?.path || '@/assets/images/no-photo.svg'" alt="" />
      </swiper-slide>
    </swiper>
    <div class="layout-container">
      <div class="market-product__top">
        <p class="market-product__title">{{ product.name }}</p>
        <div class="market-product__price">
          <img src="@/assets/icons/fitcoin.svg" alt="" />
          <p>{{ product.price }}</p>
        </div>
      </div>
      <p class="market-product__amount">
        {{ t("market_page.quantity") }}:
        <span>{{ product.qty }} {{ product["measurement"]?.name }}</span>
      </p>
      <p class="market-product__description-title">
        {{ t("market_page.detail") }}
      </p>
      <p class="market-product__description" v-html="product.description"></p>

      <!--      BUTTON START-->
      <div v-if="savedInBasket" class="gift-card__counter">
        <div @click="decreaseBasketItem" class="gift-card__button">
          <img src="@/assets/icons/minus.svg" alt="minus" />
        </div>
        <p v-if="isBasketUpdating" class="flex align-center justify-center">
          <app-spinner-loader size="24" color="var(--gf-p-loader-color)" />
        </p>
        <p v-else>{{ marketProduct.card.basket.quantity }}</p>
        <div
          @click="increaseBasketItem"
          class="gift-card__button"
          :class="{ 'full-qty': isBasketQtyFull }"
        >
          <img src="@/assets/icons/add.svg" alt="add" />
        </div>
      </div>
      <div
        v-else-if="isProductType"
        @click="addToBasket"
        class="market-product__btn flex"
      >
        <!--        <img src="@/assets/images/add.svg" alt="" />-->
        <p>{{ $t("market_page.to_basket") }}</p>
        <app-spinner-loader
          v-if="isSavingToBasket"
          size="20"
          class="ml-0-5"
          color="#FFFFFF"
        />
      </div>

      <!--      BUTTON FINISH -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "market-product-styles.scss";

.gift-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  padding: 16px 10px;
  background: var(--gf-hover-bg);
  border-radius: 8px;
  max-width: 300px;

  &__image {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;

    h5 {
      @extend .font-h5;
      text-align: center;
      max-width: 140px;
      height: 44px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: var(--gf-text-33);
    }

    .price {
      display: flex;
      column-gap: 0.5rem;

      p {
        @extend .font-15;
        @include text-gradient(
          linear-gradient(122.82deg, #f2d207 0%, #ffa329 100%)
        );
      }

      img {
        width: 100%;
        max-width: 20px;
        max-height: 20px;
        object-fit: contain;
      }
    }
  }

  &__button {
    cursor: pointer;
    background: linear-gradient(122.82deg, #f2d207 0%, #ffa329 100%);
    border-radius: 16px;
    padding: 7px 14px;

    p {
      @extend .font-14-white;
      color: var(--gf-text-white-2x);
    }
  }

  &__button.full-qty {
    background: var(--gf-text-secondary-gray);
  }

  &__counter {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;

    p {
      @extend .heading-3;
      letter-spacing: -0.4px;
      color: var(--gf-text-33);
      max-width: 60px;
      text-overflow: ellipsis;
      overflow: hidden;
      min-width: 24px;
      text-align: center;
    }

    & .gift-card__button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 2rem;
      max-height: 2rem;
      padding: 0.25rem !important;
    }
  }
}
</style>
