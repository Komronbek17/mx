import { ref } from "vue";
import api from "@/services/api";
import { tg } from "@/main";
import { useToast } from "vue-toastification";

const userInfo = ref();
const telegramInfo = ref();
const dailyInfo = ref({
  step: "",
});
const premiumInfo = ref({
  step: "",
});
const toast = useToast();

export function useInfo() {
  async function getUserInfo() {
    await api.info.getUserInfoApi().then(({ data }) => {
      userInfo.value = data.user;
    });
  }

  async function checkTelegramAuth() {
    try {
      // const telegramID = 1682889286
      const { data } = await api.telegram.checkUserApi({
        telegram_id: tg.initDataUnsafe?.user?.id,
      });
      telegramInfo.value = data;
      localStorage.setItem("lang", data.user.language);
      localStorage.setItem("accessToken", data.user.jwt);
    } catch ({ response }) {
      console.log(response.data.message);
    }
  }

  async function getDailyInfo() {
    await api.info.getDailyInfoApi().then(({ data }) => {
      dailyInfo.value = data;
      dailyInfo.value.step = 4 - +dailyInfo.value.step;
    });
  }

  async function getPremiumInfo() {
    await api.info.getPremiumInfoApi().then(({ data }) => {
      premiumInfo.value = data;
      premiumInfo.value.step = 4 - +premiumInfo.value.step;
    });
  }

  return {
    userInfo,
    telegramInfo,
    dailyInfo,
    premiumInfo,
    getUserInfo,
    getDailyInfo,
    getPremiumInfo,
    checkTelegramAuth,
  };
}
