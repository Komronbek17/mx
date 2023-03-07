<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTelegramStore } from "@/stores/telegram.store";
import { BACK_BUTTON, MAIN_BUTTON, TELEGRAM, WEB_APP } from "@/constants";

import { BackButtonController } from "@/utils/telegram/back.button.controller";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import { hasOwnProperty } from "@/utils/object.util";
import { WebAppController } from "@/utils/telegram/web.app.util";

const router = useRouter();
const route = useRoute();

const telegramStore = useTelegramStore();

function getWebApp() {
  if (hasOwnProperty(window, TELEGRAM)) {
    if (hasOwnProperty(window[TELEGRAM], WEB_APP)) {
      return window[TELEGRAM][WEB_APP];
    }
  }
  return null;
}

WebAppController.getInstance({
  webApp: window[TELEGRAM][WEB_APP],
});

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
    BackButtonController.beforeEach(route);
  }
);

if (window[TELEGRAM][WEB_APP].colorScheme === "dark") {
  document.getElementById("app").style.backgroundColor = "#181F27";
  window[TELEGRAM][WEB_APP].themeParams.bg_color = "#181F27";
  window[TELEGRAM][WEB_APP].setBackgroundColor("#181F27");
  document.documentElement.style.setProperty("--your-variable", "#YOURCOLOR");
} else {
  document.getElementById("app").style.backgroundColor = "#FFFFFF";
  window[TELEGRAM][WEB_APP].themeParams.bg_color = "#FFFFFF";
  window[TELEGRAM][WEB_APP].setBackgroundColor("#FFFFFF");
}

setTimeout(() => {
  window[TELEGRAM][WEB_APP].setHeaderColor(
    window[TELEGRAM][WEB_APP].themeParams.bg_color
  );
}, 100);
</script>

<template>
  <RouterView />
</template>
