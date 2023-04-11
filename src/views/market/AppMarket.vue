<script setup>
import {useToast} from "vue-toastification";
import {onMounted, ref} from "vue";
import {coinApi} from "@/services/coin.service";

import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import {loadingComposable} from "@/composables/loading.composable";
import {useI18n} from "vue-i18n";
import ProductCard from "@/views/market/ProductCard.vue";

import levelImage_1 from '@/assets/images/bonus-2x-level_1.svg'
import levelImage_2 from '@/assets/images/bonus-2x-level_2.svg'
import levelImage_3 from '@/assets/images/bonus-2x-level_3.svg'


const {t} = useI18n();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();
const toast = useToast();
const gifts = ref([]);
const balance = ref(0);

const modalValue = ref(false);
const level = ref(3);

const getProducts = async () => {
  try {
    const params = {
      page: 1,
      limit: 100,
    }
    await coinApi.getAllProducts({params}).then((response) => {
      gifts.value = response.data.result;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};

const fetchBalance = async () => {
  try {
    await coinApi.getBalance().then((response) => {
      balance.value = response.data.balance;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};
const askActivate = (id) => {
  submitActive(id);
};

const closeDialogModal = () => {
  modalValue.value = false;
};

const openModal = () => {
  modalValue.value = true;
};
const modalApply = () => {
  modalValue.value = false;
};

const addBasket = (item) => {
  console.log(item, "addBasket");
};

const submitActive = async (id) => {
  if (id) {
    const body = {
      method: "coin.activation_product",
      params: {
        id: id,
      },
    };

    try {
      const {data} = await coinApi.activateProduct(body);
      gifts.value = data.result;
      openModal();
    } catch (e) {
      toast.error(e.response?.data?.message ?? e.message);
    }
  }
};

const generatedImage = () => {
  if (level.value === 1) return levelImage_1
  if (level.value === 2) return levelImage_2
  return levelImage_3
}


onMounted(async () => {
  startLoading();
  try {
    await fetchBalance();
    await getProducts();
  } finally {
    finishLoading();
  }
});
</script>

<template>
  <div class="layout-container">
    <app-loader :active="isFetching"/>
    <div class="bonus-block">
      <div class="bonus-card">
        <div class="bonus-card__title">{{ $t("market_page.balance") }}:</div>
        <div class="bonus-card__price">
          <img src="@/assets/images/coin.png" alt=""/>
          <p>{{ balance }}</p>
        </div>
      </div>
    </div>

    <div class="gifts-block">
      <div class="gift-title">{{ t("market_page.prize") }}</div>
      <div class="gift-list">
        <product-card
            v-for="gift in gifts"
            :key="gift.id + '_level_1'"
            :item="gift"
            @add-basket="addBasket(gift.id)"
            @ask-activate="askActivate(gift.id)"
        />
      </div>
    </div>

    <modal-dialog :model-value="modalValue" @close-modal="closeDialogModal">
      <template #header>
        <div class="modal-header">
          <img :src="generatedImage()" alt=""/>
        </div>
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            {{ t("market_page.activated") }}!
          </h3>
          <p class="modal-content__subtitle">
            {{
              t("market_page.text", {level,})
            }}!
          </p>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer">
          <div @click="modalApply" class="modal-footer__button btn-yellow">
            {{ t("ok") }}
          </div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "market-style";
</style>
