import { ref } from "vue";
import { defineStore } from "pinia";

export const useTelegramStore = defineStore("telegram", () => {
  const backButtonController = ref(null);
  const mainButtonController = ref(null);

  function initBackButton({ backButton }) {
    backButtonController.value = backButton;
  }

  function initMainButton({ mainButton }) {
    mainButtonController.value = mainButton;
  }

  return {
    backButtonController,
    mainButtonController,
    initBackButton,
    initMainButton,
  };
});
