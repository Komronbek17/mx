<script setup>
import CatalogHome from "@/components/home/CatalogHome.vue";
import OltinBaliqIcon from "@/components/icons/OltinBaliqIcon.vue";
import UserCardHome from "@/components/home/UserCardHome.vue";

import { useTelegramStore } from "@/stores/telegram.store";
import { useTelegram } from "@/composables/telegram.composable";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { hasOwnProperty } from "@/utils/object.util";
import { useI18n } from "vue-i18n";
import { ACCEPT_LANGUAGE, TELEGRAM, WEB_APP } from "@/constants";
import { localStorageController } from "@/utils/localstorage.util";
import { useToast } from "vue-toastification";
import { WebAppController } from "@/utils/telegram/web.app.util";

const { tUserFullName } = useTelegramStore();
const { tUserUniqueId, checkTelegramUser } = useTelegram();

const router = useRouter();
const { locale } = useI18n();

function openDailyBonusPage() {
  router.push({
    name: "daily",
  });
}

onMounted(async () => {
  const data = await checkTelegramUser();
  window[TELEGRAM][WEB_APP].ready();
  const hasUser = hasOwnProperty(data, "user");
  if (hasUser) {
    const hasLanguage = hasOwnProperty(data.user, "language");
    if (hasLanguage) {
      locale.value = data.user.language;
    }
  }
  localStorageController.set(ACCEPT_LANGUAGE, locale.value);
});
</script>

<template>
  <div class="app-home">
    <user-card-home
      :user-full-name="tUserFullName"
      :user-unique-id="tUserUniqueId"
      class="mb-1"
    />

    <div class="ol-main-banner mb-1" @click="openDailyBonusPage">
      <img
        src="@/assets/images/home-card-layout.png"
        alt="banner"
        class="ol-main-banner-image"
      />
      <div
        class="ol-main-banner-content flex flex-column align-center justify-around"
      >
        <oltin-baliq-icon />
        <div class="flex flex-column justify-center align-center">
          <span class="ol-main-banner-message">Испытать удачу</span>
        </div>
      </div>
    </div>

    <catalog-home />
  </div>
</template>

<style lang="scss" scoped>
.app-home {
  padding: 1rem;
}

.ol-main-title {
  font-weight: 400;
  font-size: 1rem;
}

.ol-main-banner {
  position: relative;
  height: 98px;
  cursor: pointer;

  &-image {
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }

  &-content {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }

  &-message {
    color: var(--gf-text-white-2x);
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }

  &-user-id {
    color: white;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
