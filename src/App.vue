<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTelegramStore } from "@/stores/telegram.store";
import {
  BACK_BUTTON,
  MAIN_BUTTON,
  // OLTIN_BALIQ_BOT_TKN,
  TELEGRAM,
  WEB_APP,
} from "@/constants";

import { BackButtonController } from "@/utils/telegram/back.button.controller";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

// import { getToken } from "@/utils/auth.util";
import { hasOwnProperty } from "@/utils/object.util";

const router = useRouter();
const route = useRoute();

const telegramStore = useTelegramStore();

// if (!getToken()) {
//   localStorage.setItem(
//     OLTIN_BALIQ_BOT_TKN,
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nb2xkZW5maXNoLjFpdC51elwvdjFcL29hdXRoXC92ZXJpZnkiLCJpYXQiOjE2NzcxNjc1MTUsImV4cCI6MTcwODcwMzUxNSwibmJmIjoxNjc3MTY3NTE1LCJqdGkiOiJKdXprRWptMkpUNTJUdHcwIiwic3ViIjoyNiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.QdKY1g2VxmxyoyB2aoGM9Ni5CArPvAPpi0qNfS2nfVU"
//   );
// }

function getWebApp() {
  if (hasOwnProperty(window, TELEGRAM)) {
    if (hasOwnProperty(window[TELEGRAM], WEB_APP)) {
      return window[TELEGRAM][WEB_APP];
    }
  }
  return null;
}

BackButtonController.getInstance({
  route,
  router,
  button: window[TELEGRAM][WEB_APP][BACK_BUTTON],
});

MainButtonController.getInstance({
  route,
  router,
  button: window[TELEGRAM][WEB_APP][MAIN_BUTTON],
});

BackButtonController.onClick();

telegramStore.initApp({ webApp: getWebApp() });
watch(
  () => route.name,
  () => {
    BackButtonController.beforeEach(route);
  }
);
</script>

<template>
  <RouterView />
</template>
