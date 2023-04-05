import api from "@/services/outdated/api";
import { reactive, ref } from "vue";
import { bonusApi } from "@/services/bonus.service";

const isDialogOpen = ref(true);
const statusCode = ref(null);
const dailyResponse = reactive({
  message: "",
  price: "",
});
const premiumResponse = reactive({
  name: "",
  type: "",
  message: "",
  price: "",
  packageType: "",
  types: [],
});
const isSubmitBtnAvailable = ref(false);
const isAbortBtnAvailable = ref(false);

export function useBonus() {
  function openModal() {
    isDialogOpen.value = true;
  }

  function hideCancelButton() {
    isAbortBtnAvailable.value = false;
  }

  function showSubmitButton() {
    isSubmitBtnAvailable.value = true;
  }

  function showCancelButton() {
    isAbortBtnAvailable.value = false;
  }

  // async function getDailyBonus(method) {
  //   try {
  //     let data;
  //     if (method === "get") {
  //       const response = await bonusApi.fetchDailyLamp();
  //       data = response.data;
  //     } else if (method === "post") {
  //       const response = await bonusApi.setDailyGift();
  //       data = response.data;
  //     }
  //     Object.keys(data).forEach((key) => {
  //       dailyResponse[key] = data[key];
  //     });
  //
  //     statusCode.value = 200;
  //     hideCancelButton();
  //   } catch (e) {
  //     const response = e.response;
  //     statusCode.value = response.status;
  //
  //     Object.keys(response.data).forEach((key) => {
  //       dailyResponse[key] = response.data[key];
  //     });
  //
  //     if (statusCode.value === 403) {
  //       return hideCancelButton();
  //     }
  //
  //     showCancelButton();
  //   } finally {
  //     showSubmitButton();
  //     setTimeout(() => {
  //       openModal();
  //     }, 2500);
  //   }
  // }

  async function getPremiumBonus(method) {
    isSubmitBtnAvailable.value = false;
    try {
      const { data } = await api.bonus.getPremiumBonusApi(
        method,
        premiumResponse.packageType
      );

      if (method === "post") {
        setTimeout(() => {
          Object.keys(data).forEach((key) => {
            premiumResponse[key] = data[key];
          });
          statusCode.value = 200;
          isAbortBtnAvailable.value = false;
          isSubmitBtnAvailable.value = true;
          isDialogOpen.value = true;
        }, 2500);
      } else {
        Object.keys(data).forEach((key) => {
          premiumResponse[key] = data[key];
        });
        statusCode.value = 200;
        isDialogOpen.value = true;
      }
    } catch ({ response }) {
      statusCode.value = response.status;
      Object.keys(response.data).forEach((key) => {
        premiumResponse[key] = response.data[key];
      });
      if (statusCode.value === 406) {
        isAbortBtnAvailable.value = true;
        isSubmitBtnAvailable.value = true;
      } else if (statusCode.value === 403) {
        isSubmitBtnAvailable.value = true;
      }
      isDialogOpen.value = true;
    }
  }

  function resetValues() {
    Object.keys(dailyResponse).forEach((key) => (dailyResponse[key] = ""));
    Object.keys(premiumResponse).forEach((key) => (premiumResponse[key] = ""));
    isSubmitBtnAvailable.value = false;
    isAbortBtnAvailable.value = false;
    statusCode.value = "";
  }

  return {
    // getDailyBonus,
    getPremiumBonus,
    resetValues,
    statusCode,
    isDialogOpen,
    dailyResponse,
    premiumResponse,
    isSubmitBtnAvailable,
    isAbortBtnAvailable,
  };
}
