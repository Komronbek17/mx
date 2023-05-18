<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";

import ProductCard from "@/views/market/ProductCard.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import MarketPolicyModal from "@/views/market/elements/MarketPolicyModal.vue";
// import levelImage_1 from "@/assets/images/bonus-2x-level_1.svg";
// import levelImage_2 from "@/assets/images/bonus-2x-level_2.svg";
import levelImage_3 from "@/assets/images/bonus-2x-level_3.svg";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import ToastErrorIcon from "@/components/icons/ToastErrorIcon.vue";
import { useMarketStore } from "@/views/market/market.store";

const router = useRouter();
const { t } = useI18n();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();
const gifts = ref([]);
const balance = ref(0);

const modalValue = ref(false);
const levelProduct = ref({});
const marketStore = useMarketStore();

watch(
  () => marketStore.products,
  () => {
    if (marketStore.products.length) {
      MainButtonController.setText(
        `${t("market_page.show_order")} (${marketStore.products.length})`
      );
    }
  }
);

async function getProducts() {
  try {
    const params = {
      page: 1,
      limit: 100,
    };
    const response = await coinApi.getAllProducts({ params });
    gifts.value = response.data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
}

const fetchBalance = async () => {
  try {
    await coinApi.getBalance().then((response) => {
      balance.value = response.data.balance;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};

const askActivate = (item) => {
  levelProduct.value = item;
  openModal();
};

const closeDialogModal = () => {
  modalValue.value = false;
};

const openModal = () => {
  modalValue.value = true;
};
const modalApply = () => {
  submitActive(levelProduct.value);
};

const modalCancel = () => {
  closeDialogModal();
  setTimeout(() => {
    levelProduct.value = {};
  }, 500);
};

const submitActive = async (item) => {
  const body = {
    method: "coin.activation_product",
    params: {
      id: item.id,
    },
  };
  try {
    await coinApi.activateProduct(body);
    await getProducts();
    await fetchBalance();
    modalCancel();
    toast.success(t("market_page.bonus_activated"), {
      position: "bottom-center",
      hideProgressBar: true,
      closeButton: false,
    });
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message, {
      icon: ToastErrorIcon,
    });
  } finally {
    modalCancel();
  }
};

const generatedImage = computed(() => {
  if (
    levelProduct.value &&
    levelProduct.value.images &&
    levelProduct.value.images[0]
  )
    return levelProduct.value.images[0].path;
  return levelImage_3;
});

function updateProductBasketState({ basket }) {
  const pIdx = gifts.value.findIndex((g) => g["id"] === basket["product_id"]);
  if (pIdx !== -1) {
    gifts.value[pIdx].basket = basket;
  }
}

async function fetchItems() {
  try {
    startLoading();
    await Promise.allSettled([
      await fetchBalance(),
      await getProducts(),
      await getBasketItems(),
    ]);
  } finally {
    finishLoading();
  }
}

async function getBasketItems() {
  try {
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

function openBasketPage() {
  router.push({
    name: "market-basket",
  });
}

function openMonitoringPage() {
  router.push({
    name: "monitoring",
  });
}

function showMainButton() {
  MainButtonController.run();
  MainButtonController.onClick(openBasketPage);
  MainButtonController.setBackgroundColor("#16A34A");
  MainButtonController.setText(`${t("market_page.show_order")}`);
}

WebAppController.ready();
showMainButton();
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(openBasketPage);
});
fetchItems();
</script>

<template>
  <div class="layout-container">
    <app-loader :active="isFetching" />
    <div class="bonus-block">
      <div @click="openMonitoringPage" class="bonus-card">
        <div class="bonus-card__title">{{ $t("market_page.balance") }}:</div>
        <div class="bonus-card__price">
          <img src="@/assets/icons/fitcoin.svg" alt="" />
          <p>{{ balance }} Fit-Coin</p>
        </div>
      </div>
    </div>

    <div class="gifts-block">
      <div class="gift-title">{{ t("market_page.products") }}</div>
      <div class="gift-list">
        <product-card
          v-for="gift in gifts"
          :key="gift.id + '_level_1'"
          :item="gift"
          @ask-activate="askActivate(gift)"
          @update-product-basket="updateProductBasketState"
        />
      </div>
    </div>

    <market-policy-modal />

    <modal-dialog
      design-class="bonus-modal"
      :model-value="modalValue"
      @close-modal="closeDialogModal"
    >
      <template #header>
        <div class="modal-header">
          <img
            v-if="levelProduct && levelProduct.images"
            :src="generatedImage"
            alt=""
          />
        </div>
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            {{ levelProduct.name }}
            <!-- {{ t("market_page.bonus") }}-->
          </h3>
          <div class="modal-content__subtitle">
            <p class="name" v-html="levelProduct.description" />
            <!--              {{-->
            <!--                t("market_page.bonus_description", {-->
            <!--                  name: levelProduct.name,-->
            <!--                  duration: levelProduct.duration,-->
            <!--                  duration_type: t(-->
            <!--                    `duration_types.${levelProduct.duration_type}`-->
            <!--                  ),-->
            <!--                })-->
            <!--              }}-->
            <p class="price">
              {{ t("market_page.bonus_price") }}
              <img src="@/assets/icons/fitcoin.svg" alt="coin" />
              {{ levelProduct.price }}
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer">
          <div @click="modalApply" class="modal-footer__button btn-info">
            {{ t("market_page.activate") }}
          </div>

          <div @click="modalCancel" class="modal-footer__button btn-gray">
            {{ t("cancel") }}
          </div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "src/views/market/market-style";
@import "src/assets/scss/toast";
</style>
