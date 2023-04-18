<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import CatalogHome from "@/components/home/CatalogHome.vue";
import OltinBaliqIcon from "@/components/icons/OltinBaliqIcon.vue";
import UserCardHome from "@/components/home/UserCardHome.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
// import VoteModal from "@/views/vote/VoteModal.vue";

import { hasOwnProperty } from "@/utils/object.util";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { localStorageController } from "@/utils/localstorage.util";
import { useTelegram } from "@/composables/telegram.composable";
import { loadingComposable } from "@/composables/loading.composable";

import { ACCEPT_LANGUAGE, USER_DATA } from "@/constants";
import { useTelegramStore } from "@/stores/telegram.store";
import { profileApi } from "@/services/profile.service";
import { AmplitudeTracker } from "@/libs/amplitude/analyticsBrowser";
import { useMeStore } from "@/stores/me.store";

const { tUserFullName } = useTelegramStore();
const meStore = useMeStore();
const { tUserUniqueId, checkTelegramUser } = useTelegram();

const router = useRouter();
const { locale, t } = useI18n();
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

function openDailyBonusPage() {
  router.push({
    name: "daily",
  });
}

const user = ref({
  id: null,
  fullName: null,
  avatar: null,
});

const getMe = async () => {
  try {
    const {
      data: { result },
    } = await profileApi.fetchMe();
    meStore.initMe({ meCtx: result });
    user.value.id = result.id || tUserUniqueId;
    user.value.fullName =
      result.first_name || result.last_name
        ? result.first_name + " " + result.last_name
        : tUserFullName;
    user.value.avatar =
      result.upload?.path || "@/assets/images/profile-image.svg";
    localStorageController.set(ACCEPT_LANGUAGE, result.language);
    localStorageController.set(USER_DATA, result);
  } catch (e) {
    console.log(e, "e");
  }
};

onMounted(async () => {
  try {
    startLoading();
    await getMe();
    const data = await checkTelegramUser();
    const hasUser = hasOwnProperty(data, "user");
    if (hasUser) {
      const hasLanguage = hasOwnProperty(data.user, "language");
      if (hasLanguage) {
        locale.value = data.user.language;
      }
    }
    localStorageController.set(ACCEPT_LANGUAGE, locale.value);
  } finally {
    finishLoading();
  }
});

WebAppController.ready();

AmplitudeTracker.lunch({
  properties: {
    webapp_launched_at: new Date(),
  },
});
</script>

<template>
  <div class="app-home">
    <app-loader :active="isFetching" />
    <user-card-home
      :user-full-name="user.fullName"
      :user-unique-id="user.id"
      :user-avatar="user.avatar"
      class="mb-1"
    />

    <div class="ol-main-banner mb-1" @click="openDailyBonusPage">
      <div
        class="ol-main-banner-content flex flex-column align-center justify-around"
      >
        <oltin-baliq-icon />
        <div class="flex flex-column justify-center align-center">
          <span class="ol-main-banner-message">
            {{ t("home_page.try_luck") }}
          </span>
        </div>
      </div>
    </div>

    <catalog-home />

    <!--    <vote-modal />-->
  </div>
</template>

<style lang="scss" scoped>
.app-home {
  padding: 1rem;
  background-color: var(--neutral-background);
}

.ol-main-title {
  @extend .text-16-400;
}

.ol-main-banner {
  position: relative;
  height: 98px;
  cursor: pointer;
  white-space: nowrap;
  background: var(--gradient-purple);
  border-radius: 8px;

  //&-image {
  //  width: 100%;
  //  height: 100%;
  //}

  &-content {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }

  &-message {
    color: var(--neutral-white);
    @extend .text-16-600;
  }

  &-user-id {
    color: var(--neutral-white);
    @extend .text-14-400;
  }
}
</style>
