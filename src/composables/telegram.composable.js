import { computed, reactive, toRefs } from "vue";
import { useTelegramStore } from "@/stores/telegram.store";
import { telegramApi } from "@/services/telegram.service";
import { useToast } from "vue-toastification";
import { keys } from "@/utils/object.util";

const telegramInfo = reactive({
  data: {
    user: {},
  },
});

export function useTelegram() {
  const isNotFetched = computed(() => {
    return keys(telegramInfo.data.user).length < 1;
  });

  async function checkTelegramUser() {
    const toast = useToast();
    try {
      const { tUserId } = useTelegramStore();

      const body = {
        telegram_id: tUserId,
      };
      const data = await telegramApi.authJwt(body);
      telegramInfo.data = data?.data;
      return data;
    } catch (e) {
      // console.log(e, 'error');
      toast.error(e?.response?.data?.message ?? e.message);
      return {};
    }
  }

  const tUserUniqueId = computed(() => {
    if (telegramInfo.data) {
      return telegramInfo.data?.user?.user_id;
    }
    return "";
  });

  return {
    telegramInfo: toRefs(telegramInfo),
    tUserUniqueId,
    checkTelegramUser,
    isNotFetched,
  };
}
