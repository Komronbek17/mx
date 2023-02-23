import { ref } from "vue";
import { defineStore } from "pinia";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { BackButtonController } from "@/utils/telegram/back.button.controller";

export const useTelegramStore = defineStore("telegram", () => {
  const webApp = ref(null);
  const backButtonController = ref(null);
  const mainButtonController = ref(null);

  function initWebApp({ tApp }) {
    webApp.value = tApp;
  }
  function initBackButton({ route, router }) {
    backButtonController.value = new BackButtonController({
      route,
      router,
    });
  }

  function initMainButton({ route, router }) {
    mainButtonController.value = new MainButtonController({
      route,
      router,
    });
  }

  function initApp({ webApp, backButton, mainButton }) {
    initWebApp({ tApp: webApp });
    initBackButton({ backButton });
    initMainButton({ mainButton });
  }

  return {
    webApp,
    backButtonController,
    mainButtonController,
    initApp,
  };
});
