<script setup>
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { productApi } from "@/services/product.service";

import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { useI18n } from "vue-i18n";

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
const activeId = ref(null);

const getProducts = async () => {
  try {
    const body = {
      method: "coin.get_all_products",
      params: {
        page: 1,
        limit: 10,
      },
    };
    await productApi.fetchProducts(body).then((response) => {
      gifts.value = response.data.result;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};

const fetchBalance = async () => {
  try {
    await productApi.getBalance().then((response) => {
      balance.value = response.data.balance;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};
const askActivate = (id) => {
  activeId.value = id;
  openModal();
};

const closeDialogModal = () => {
  modalValue.value = false;
  activeId.value = null;
};

const openModal = () => {
  modalValue.value = true;
};
const modalApply = () => {
  submitActive();
  modalValue.value = false;
};

const addBasket = (item) => {
  console.log(item, "addBasket");
};

const submitActive = async () => {
  if (activeId.value) {
    const body = {
      method: "coin.activation_product",
      params: {
        id: activeId.value,
      },
    };

    try {
      const { data } = await productApi.activateProduct(body);
      // console.log(data,'data');
      gifts.value = data.result;
    } catch (e) {
      console.log(e, "getProducts();");
      toast.error(e.response?.data?.message ?? e.message);
    }
  }
};

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
    <app-loader :active="isFetching" />
    <div class="bonus-block">
      <div class="bonus-card">
        <div class="bonus-card__title">{{ $t("market_page.balance") }}:</div>
        <div class="bonus-card__price">
          <img src="@/assets/images/coin.png" alt="" />
          <p>{{ balance }}</p>
        </div>
      </div>
    </div>

    <div class="gifts-block">
      <div class="gift-title">{{ t("market_page.prize") }}</div>
      <div class="gift-list">
        <router-link
          v-for="gift in gifts"
          :key="gift.id + '_level_1'"
          :to="{ name: 'market-product', params: { id: gift.id } }"
          class="gift-card"
        >
          <div class="gift-card__image">
            <img
              :src="gift.images[0]?.path || '@/assets/images/no-photo.svg'"
              alt=""
            />
          </div>
          <div class="gift-card__content">
            <h5>{{ gift.name }}</h5>
            <div class="price">
              <img src="@/assets/images/coin.png" alt="" />
              <p>{{ gift.price }}</p>
            </div>
          </div>
          <div
            v-if="gift.type === 'product'"
            @click="addBasket(gift.id)"
            class="gift-card__button"
          >
            <p>{{ t("market_page.to_basket") }}</p>
          </div>
          <div v-else @click="askActivate(gift.id)" class="gift-card__button">
            <p>{{ t("market_page.activate") }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <modal-dialog :model-value="modalValue" @close-modal="closeDialogModal">
      <template #header>
        <div class="modal-header">
          <img src="@/assets/images/2x-blue.png" alt="" />
        </div>
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            {{ t("market_page.activated") }}!
          </h3>
          <p class="modal-content__subtitle">
            {{
              t("connect_premium_service_message", {
                level: 1,
              })
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
