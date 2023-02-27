<script setup>
import { useRoute, useRouter } from "vue-router";
import { useTelegramStore } from "@/stores/telegram.store";
import { hasOwnProperty } from "@/utils/object.util";
import { TELEGRAM, WEB_APP } from "@/constants";
// import { MainButtonController } from "@/utils/telegram/main.button.controller";
// import { BackButtonController } from "@/utils/telegram/back.button.controller";

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
telegramStore.initApp({ route, router, webApp: getWebApp() });
// watch(route.name, () => {
//   telegramStore.backButtonController;
// });
</script>

<template>
  <RouterView />
</template>
