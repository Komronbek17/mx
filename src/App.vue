<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTelegramStore } from "@/stores/telegram.store";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { BackButtonController } from "@/utils/telegram/back.button.controller";

const router = useRouter();
const route = useRoute();
const telegramStore = useTelegramStore();
onMounted(() => {
  telegramStore.initMainButton({
    mainButton: new MainButtonController({
      route,
      router,
    }),
  });

  telegramStore.initBackButton({
    backButton: new BackButtonController({
      route,
      router,
    }),
  });
});
</script>

<template>
  <RouterView />
</template>
