import api from "@/services/api";
import { reactive, ref } from "vue";

const isDialogOpen = ref(false);
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
  // async function getDailyBonus(method) {
  //   try {
  //     const { data } = await api.bonus.getDailyBonusApi(method);
  //     Object.keys(data).forEach((key) => {
  //       dailyResponse[key] = data[key];
  //     });
  //     statusCode.value = 200;
  //     isAbortBtnAvailable.value = false;
  //   } catch ({ response }) {
  //     statusCode.value = response.status;
  //     Object.keys(response.data).forEach((key) => {
  //       dailyResponse[key] = response.data[key];
  //     });
  //     if (statusCode.value === 403) return (isAbortBtnAvailable.value = false);
  //     isAbortBtnAvailable.value = true;
  //   } finally {
  //     setTimeout(() => {
  //       isDialogOpen.value = true;
  //     }, 2500);
  //     isSubmitBtnAvailable.value = true;
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
    getDailyBonus,
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
