<script setup>
import * as yup from "yup";
import { useField } from "vee-validate";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { onBeforeRouteLeave } from "vue-router";
import { BASKET_TOTAL_PRICE } from "@/constants";
import { coinApi } from "@/services/coin.service";
import { hasOwnProperty } from "@/utils/object.util";
import { formatToPrice } from "@/utils/number.util";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { sessionStorageController } from "@/utils/localstorage.util";
import { loadingComposable } from "@/composables/loading.composable";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import ReceiverForm from "@/views/market/elements/ReceiverForm.vue";
import ClientDetails from "@/views/market/elements/ClientDetails.vue";
import CheckoutSelectAddress from "@/views/market/elements/SelectAddress.vue";

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();
const checkoutStuff = reactive({
  addressList: [],
  clientList: [],
});
const selectAddress = ref(null);
const receiverForm = ref(null);
const {
  value: address,
  errorMessage: addressEMessage,
  validate: validateAddress,
} = useField("selectAddress", yup.object().required().label("Address"));

const hasClientDetails = computed(() => checkoutStuff.clientList.length > 0);

const productsTotalCost = computed(() => {
  const productsTotalCost = sessionStorageController.get(BASKET_TOTAL_PRICE);
  if (productsTotalCost && parseFloat(productsTotalCost)) {
    const cost = parseFloat(productsTotalCost);
    let decimal = cost - Math.floor(cost);
    if (decimal > 0) {
      return cost.toFixed(2);
    }
    return Math.floor(cost);
  }

  return 0;
});

const deliveryCost = computed(() => {
  if (address.value && hasOwnProperty(address.value, "delivery_cost")) {
    const cost = address.value["delivery_cost"];
    let decimal = cost - Math.floor(cost);
    if (decimal > 0) {
      return cost.toFixed(2);
    }
    return Math.floor(cost);
  }

  return 0;
});

const total = computed(() => {
  const sum = productsTotalCost.value + deliveryCost.value;
  let decimal = sum - Math.floor(sum);
  if (decimal > 0) {
    return sum.toFixed(2);
  }
  return Math.floor(sum);
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

async function fetchClientDetails({ page = 1, limit = 20 }) {
  try {
    const response = await coinApi.clientFindAll({
      body: { page, limit },
    });
    checkoutStuff.clientList = response.data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  }
}

async function saveClient() {}

async function initialize() {
  try {
    startLoading();
    await Promise.allSettled([fetchUserLocations({}), fetchClientDetails({})]);
  } finally {
    finishLoading();
  }
}

async function submitOrder() {
  const { valid: hasAddressSelect } = await validateAddress();
  const { valid: hasReceiverFill } = await receiverForm.value.validate();
  if (hasAddressSelect && hasReceiverFill) {
    console.log("order", receiverForm.value.values);
  }
}

WebAppController.ready();
MainButtonController.run();
MainButtonController.setText("Оплатить");
MainButtonController.onClick(submitOrder);
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(submitOrder);
});
initialize();
</script>

<template>
  <div class="ol-market-checkout">
    <app-loader :active="isFetching" />
    <checkout-select-address
      v-model="address"
      ref="selectAddress"
      :address-list="checkoutStuff.addressList"
    >
      <template #default>
        <span v-if="addressEMessage" class="error-message d-block mt-0-5 ml-1">
          <span class="error-message">{{ addressEMessage }}</span>
        </span>
      </template>
    </checkout-select-address>

    <client-details
      v-if="hasClientDetails"
      :client-list="checkoutStuff.clientList"
    />

    <receiver-form v-else ref="receiverForm" />

    <div class="ol-market-receipt pr-2 pl-2 mb-2">
      <h3>ПОДРОБНОСТИ ЗАКАЗА</h3>
      <div class="flex justify-between align-center">
        <span>В корзине</span>
        <span>
          <img
            :width="24"
            :height="24"
            alt="coin icon"
            src="@/assets/images/coin.png"
          />
          <span>{{ formatToPrice(productsTotalCost) }}</span>
        </span>
      </div>

      <div class="flex justify-between align-center">
        <span>Доставка</span>
        <span>
          <img
            :width="24"
            :height="24"
            alt="coin icon"
            src="@/assets/images/coin.png"
          />
          <span>{{ formatToPrice(deliveryCost) }}</span>
        </span>
      </div>

      <div class="flex justify-between align-center">
        <span>Итого</span>
        <span>
          <img
            :width="24"
            :height="24"
            alt="coin icon"
            src="@/assets/images/coin.png"
          />
          <span>{{ formatToPrice(total) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
