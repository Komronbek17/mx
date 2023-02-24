import { ref } from "vue";
import { authApi } from "@/services/auth.service";
import { useTelegramStore } from "@/stores/telegram.store";

export function useAuth() {
  const telegramInfo = ref(null);

  const checkUser = async () => {
    const { tUserId } = useTelegramStore();

    const { data } = await authApi.login({
      body: {
        telegram_id: tUserId,
      },
    });
    console.log(data);
  };

  return {
    telegramInfo,
    checkUser,
  };
}
