<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

import { coinApi } from "@/services/coin.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import ReceiverForm from "@/views/market/elements/ReceiverForm.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { useI18n } from "vue-i18n";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const receiverFormRef = ref(null);
const { t } = useI18n();

const {
  loading: isTransferring,
  startLoading,
  finishLoading,
} = loadingComposable();

const clientUnique = computed(() => route.params.id);
const isUpdatingRole = computed(() => route.name === "checkout-client-update");

async function saveRecord() {
  const { valid: hasReceiverFill } = await receiverFormRef.value.validate();
  if (hasReceiverFill) {
    if (isUpdatingRole.value) {
      await clientUpdateHandler({
        id: route.params.id,
        ...generateBody(),
      });
    } else {
      await clientCreateHandler({
        ...generateBody(),
      });
    }
  }
}

function generateBody() {
  const { clientFirstName, clientLastName, clientPinfl } =
    receiverFormRef.value.values;
  const cForm = {};
  cForm.pinfl = clientPinfl;
  cForm.first_name = clientFirstName;
  cForm.last_name = clientLastName;
  cForm.passport = receiverFormRef.value.passport;
  return cForm;
}

async function clientCreateHandler(ctx) {
  try {
    startLoading();
    await coinApi.clientCreate({
      body: ctx,
    });
    await router.push({
      name: "market-checkout",
    });
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishLoading();
  }
}


async function clientUpdateHandler(ctx) {
  try {
    startLoading();
    await coinApi.clientUpdate({
      body: ctx,
    });
    await router.push({
      name: "market-checkout",
    });
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishLoading();
  }
}

async function getClientDetails() {
  try {
    startLoading();

    const response = await coinApi.clientFindOne({
      body: { id: clientUnique.value },
    });

    receiverFormRef.value.fillOut({
      pinfl: response.data.result.pinfl,
      lastName: response.data.result.last_name,
      firstName: response.data.result.first_name,
      passportFile: response.data.result.passport,
    });
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishLoading();
  }
}

WebAppController.ready();
MainButtonController.run();
MainButtonController.setText(`${t("login_page.confirm_btn")}`);
MainButtonController.onClick(saveRecord);

onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(saveRecord);
});

if (isUpdatingRole.value) {
  getClientDetails();
}
</script>

<template>
  <div>
    <app-loader :active="isTransferring" />
    <receiver-form ref="receiverFormRef" />
  </div>
</template>
