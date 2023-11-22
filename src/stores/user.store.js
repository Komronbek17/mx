import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { profileApi } from "@/services/profile.service";
import { localStorageController } from "@/utils/localstorage.util";
import { ACCEPT_LANGUAGE, USER_DATA } from "@/constants";
import { useTelegram } from "@/composables/telegram.composable";
import { useI18n } from "vue-i18n";
import { useTelegramStore } from "@/stores/telegram.store";
import { useToast } from "vue-toastification";

export const useUserStore = defineStore("user", () => {
  const { tUserFullName, tUser } = useTelegramStore();
  const { tUserUniqueId } = useTelegram();
  const { locale } = useI18n();
  const toast = useToast();

  const user = ref({
    id: "",
    first_name: "",
    last_name: "",
    fullName: "",
    avatar: null,
    region: null,
  });

  const meUniqueId = computed(() => user.value.id);

  function setUser(result) {
    user.value.id = result.id || tUserUniqueId;
    user.value.first_name = result.first_name || tUser.first_name || "";
    user.value.last_name = result.last_name || tUser.last_name || "";
    user.value.fullName =
      result.first_name || result.last_name
        ? result.first_name + " " + result.last_name
        : tUserFullName;
    user.value.avatar = result.upload?.path || "";
    user.value.upload = result.upload || null;
    user.value.region = result.region || null;
    localStorageController.set(ACCEPT_LANGUAGE, result.language);
    localStorageController.set(USER_DATA, result);
    locale.value = result.language || "uz";
  }

  async function initUser() {
    try {
      const {
        data: { result },
      } = await profileApi.fetchMe();
      setUser(result);
    } catch (e) {
      // eslint-disable-next-line no-undef
      toast.error(e.response?.data?.message ?? e.message);
    }
  }

  function updateUser(result) {
    console.log(result, "result");
    setUser(result);
  }

  // function updateAvatar(avatar){
  //     user.value.upload = avatar
  //     user.value.avatar = avatar?.path || "";
  // }

  return {
    user,
    meUniqueId,
    initUser,
    updateUser,
  };
});
