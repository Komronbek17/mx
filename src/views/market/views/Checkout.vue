<script setup>
import CheckoutSelectAddress from "@/views/market/elements/SelectAddress.vue";
import ReceiverForm from "@/views/market/elements/ReceiverForm.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { coinApi } from "@/services/coin.service";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { WebAppController } from "@/utils/telegram/web.app.util";

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();
const checkoutStuff = reactive({
  addressList: [],
});

async function fetchUserLocations({ page = 1, limit = 20 }) {
  try {
    const response = await coinApi.addressFindAll({
      body: { page, limit },
    });
    checkoutStuff.addressList = response.data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  }
}

async function initialize() {
  try {
    startLoading();
    await Promise.allSettled([fetchUserLocations({})]);
  } finally {
    finishLoading();
  }
}

WebAppController.ready();
initialize();
</script>

<template>
  <div class="ol-market-checkout">
    <app-loader :active="isFetching" />
    <checkout-select-address :address-list="checkoutStuff.addressList" />
    <receiver-form />
  </div>
</template>

<style lang="scss" scoped></style>
