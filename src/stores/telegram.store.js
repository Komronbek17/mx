import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { BackButtonController } from "@/utils/telegram/back.button.controller";

export const useTelegramStore = defineStore("telegram", () => {
  const webApp = ref({
    initDataUnsafe: {
      user: {
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        language_code: "",
      },
    },
  });
  const backButtonController = new BackButtonController({});
  const mainButtonController = reactive({
    controller: new MainButtonController({}),
  });

  const tUserId = computed(() => webApp.value.initDataUnsafe.user.id);
  const tUser = computed(() => webApp.value.initDataUnsafe.user);
  const tUserFullName = computed(
    () => tUser.value?.last_name + " " + tUser.value?.first_name
  );

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

  function initApp({ webApp: tApp, route, router }) {
    initWebApp({ tApp });
    initBackButton({ route, router });
    initMainButton({ route, router });
  }

  return {
    webApp,
    backButtonController,
    mainButtonController,
    tUserId,
    tUser,
    tUserFullName,
    initApp,
  };
});
