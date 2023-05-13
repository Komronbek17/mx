<script setup>
import * as yup from "yup";
import { useField } from "vee-validate";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { BASKET_PRODUCTS, BASKET_TOTAL_PRICE } from "@/constants";
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
import { isArray } from "@/utils/inspect.util";
import { useMarketStore } from "@/views/market/market.store";
import { useI18n } from "vue-i18n";

const marketStore = useMarketStore();
const { t } = useI18n();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();
const router = useRouter();
const checkoutStuff = reactive({
  addressList: [],
  clientList: [],
});
const selectAddress = ref(null);
const receiverFormRef = ref(null);
const {
  value: address,
  errorMessage: addressEMessage,
  validate: validateAddress,
} = useField(
  "selectAddress",
  yup
    .object()
    .required(t("yup.choose", { _field_: t("market_page.address") }))
    .label("Address")
);

const {
  value: client,
  errorMessage: clientEMessage,
  validate: validateClient,
} = useField(
  "receiverFormRef",
  yup
    .object()
    .required(t("yup.choose", { _field_: t("market_page.form.receiver") }))
    .label("Client")
);

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

async function saveClient() {
  try {
    const { clientFirstName, clientLastName, clientPinfl } =
      receiverFormRef.value.values;
    const cForm = {};
    cForm.pinfl = clientPinfl;
    cForm.last_name = clientFirstName;
    cForm.first_name = clientLastName;
    cForm.passport = receiverFormRef.value.passport;
    const response = await coinApi.clientCreate({
      body: cForm,
    });
    return response.data.result;
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  }
}

function setBasketProducts() {
  if (marketStore.products.length) {
    return;
  }
  const sessionProducts = sessionStorageController.get(BASKET_PRODUCTS);
  const products = JSON.parse(sessionProducts);
  if (isArray(products) && products.length) {
    marketStore.setBasketProducts({ products });
  }
}

async function initialize() {
  try {
    startLoading();
    setBasketProducts();
    await Promise.allSettled([fetchUserLocations({}), fetchClientDetails({})]);
  } finally {
    finishLoading();
  }
}

async function submitOrder() {
  try {
    const { valid: hasAddressSelect } = await validateAddress();

    let vc;
    let clientId;

    if (hasClientDetails.value) {
      const { valid } = await validateClient();
      vc = valid;
      if (vc) {
        clientId = client.value.id;
      }
    } else {
      const { valid: hasReceiverFill } = await receiverFormRef.value.validate();
      if (hasReceiverFill) {
        const savedClient = await saveClient();
        clientId = savedClient.id;
      }
    }

    if (hasAddressSelect && vc) {
      startLoading();
      const bodyCtx = {
        client_detail_id: clientId,
        address_id: address.value.id,
        basket_ids: marketStore.activeProducts
          .filter((p) => p["is_available"])
          .map((p) => p.id),
      };

      console.table(marketStore.activeProducts);
      console.table(bodyCtx);

      await coinApi.orderCreate({
        body: bodyCtx,
      });

      await router.push({
        name: "market-ordered-successfully",
      });
    }
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishLoading();
  }
}

WebAppController.ready();
MainButtonController.run();
MainButtonController.setText(`${t("to_pay")}`);
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
      ref="receiverFormRef"
      v-model="client"
    >
      <template #default>
        <span v-if="clientEMessage" class="error-message d-block mt-0-5 ml-1">
          <span class="error-message">{{ clientEMessage }}</span>
        </span>
      </template>
    </client-details>

    <receiver-form v-else ref="receiverFormRef" />

    <div class="ol-market-receipt pr-2 pl-2 mb-2">
      <h3 class="title">{{ $t("market_page.order_details") }}</h3>
      <div class="in-cart flex justify-between align-center">
        <span class="in-cart_title">{{ $t("market_page.in_cart") }}</span>
        <span class="in-cart_img">
          <img
            :width="24"
            :height="24"
            alt="coin icon"
            src="@/assets/icons/fitcoin.svg"
          />
          <span class="in-cart_value">
            {{ formatToPrice(productsTotalCost) }}
          </span>
        </span>
      </div>

      <div class="delivery flex justify-between align-center">
        <span class="delivery-title">{{ $t("market_page.delivery") }}</span>
        <span class="delivery-img">
          <img
            :width="24"
            :height="24"
            alt="coin icon"
            src="@/assets/icons/fitcoin.svg"
          />
          <span class="delivery-value">{{ formatToPrice(deliveryCost) }}</span>
        </span>
      </div>

      <div class="sum flex justify-between align-center">
        <span class="sum-title">{{ $t("market_page.sum") }}</span>
        <span class="sum-img">
          <img
            :width="24"
            :height="24"
            alt="coin icon"
            src="@/assets/icons/fitcoin.svg"
          />
          <span class="sum-value">{{ formatToPrice(total) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-market-receipt {
  padding: 0 1rem;
  margin-top: 1.25rem;
}

.title {
  @extend .text-15-600;
  color: var(--gf-text-33);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.in-cart {
  margin-bottom: 1rem;
  &_title {
    @extend .text-16-400;
    color: var(--gf-text-33);
  }

  &_img {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & img {
      width: 16px;
      height: 16px;
      object-fit: contain;
      margin-right: 0.5rem;
    }
  }

  &_value {
    @extend .text-16-400;
    color: var(--gf-text-33);
  }
}

.delivery {
  padding-bottom: 24px;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--gf-hover-bg);

  &-title {
    @extend .text-16-400;
    color: var(--gf-text-33);
  }

  &-img {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & img {
      width: 16px;
      height: 16px;
      object-fit: contain;
      margin-right: 0.5rem;
    }
  }

  &-value {
    @extend .text-16-400;
    color: var(--gf-text-33);
  }
}

.sum {
  &-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--gf-text-33);
  }

  &-img {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin-right: 8px;
    }
  }

  &-value {
    font-size: 20px;
    font-weight: 600;
    color: var(--accent-yellow);
  }
}
</style>
