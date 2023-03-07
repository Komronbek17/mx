<script setup>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTelegramStore } from "@/stores/telegram.store";
import { BACK_BUTTON, MAIN_BUTTON, TELEGRAM, WEB_APP } from "@/constants";

import { BackButtonController } from "@/utils/telegram/back.button.controller";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import { hasOwnProperty } from "@/utils/object.util";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { themeComposable } from "@/composables/theme.composable";

const router = useRouter();
const route = useRoute();

const telegramStore = useTelegramStore();
const { setThemeVariables } = themeComposable();

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

setThemeVariables();

if (WebAppController.webApp.colorScheme === "dark") {
  document.getElementById("app").style.backgroundColor = "#181F27";
  WebAppController.webApp.themeParams.bg_color = "#181F27";
  WebAppController.webApp.setBackgroundColor("#181F27");
} else {
  document.getElementById("app").style.backgroundColor = "#FFFFFF";
  WebAppController.webApp.themeParams.bg_color = "#FFFFFF";
  WebAppController.webApp.setBackgroundColor("#FFFFFF");
}

// onMounted(() => {
//   WebAppController.webApp.setHeaderColor(
//     WebAppController.webApp.themeParams.bg_color
//   );
// });

setTimeout(() => {
  WebAppController.webApp.setHeaderColor(
    WebAppController.webApp.themeParams.bg_color
  );
}, 100);
</script>

<template>
  <RouterView />
</template>
