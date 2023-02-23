<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTelegramStore } from "@/stores/telegram.store";
import { hasOwnProperty } from "@/utils/object.util";
import { TELEGRAM, WEB_APP } from "@/constants";

const router = useRouter();
const route = useRoute();

const telegramStore = useTelegramStore();

function getWebApp() {
  if (hasOwnProperty(window, TELEGRAM)) {
    if (hasOwnProperty(window[TELEGRAM], WEB_APP)) {
      return window[TELEGRAM][WEB_APP];
    }
  }
}

onMounted(() => {
  telegramStore.initApp({ route, router, webApp: getWebApp() });
});
</script>

<template>
  <RouterView />
</template>
