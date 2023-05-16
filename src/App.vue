<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTelegramStore } from "@/stores/telegram.store";
import {
  ACCEPT_LANGUAGE,
  BACK_BUTTON,
  MAIN_BUTTON,
  TELEGRAM,
  WEB_APP,
} from "@/constants";

import { BackButtonController } from "@/utils/telegram/back.button.controller";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import { hasOwnProperty } from "@/utils/object.util";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { localStorageController } from "@/utils/localstorage.util";
import { useI18n } from "vue-i18n";
import { AmplitudeTracker } from "@/libs/amplitude/analyticsBrowser";
import VoteStartModal from "@/views/vote/VoteStartModal.vue";

const route = useRoute();
const router = useRouter();

const telegramStore = useTelegramStore();

const { locale } = useI18n();

locale.value = localStorageController.get(ACCEPT_LANGUAGE);

function getWebApp() {
  if (hasOwnProperty(window, TELEGRAM)) {
    if (hasOwnProperty(window[TELEGRAM], WEB_APP)) {
      return window[TELEGRAM][WEB_APP];
    }
  }
  return null;
}

WebAppController.getInstance({
  route,
  router,
  webApp: window[TELEGRAM][WEB_APP],
});

WebAppController.setRootVariables();
WebAppController.closingConfirmationEnable();

BackButtonController.getInstance({
  route,
  router,
  button: window[TELEGRAM][WEB_APP][BACK_BUTTON],
});

BackButtonController.onClick();

MainButtonController.getInstance({
  route,
  router,
  button: window[TELEGRAM][WEB_APP][MAIN_BUTTON],
});

telegramStore.initApp({ webApp: getWebApp() });

watch(
  () => route.name,
  () => {
    WebAppController.beforeEach();
    BackButtonController.beforeEach(route);
  },
  {
    immediate: true,
  }
);

AmplitudeTracker.initialize();
</script>

<template>
  <RouterView />
</template>
