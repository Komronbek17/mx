<script setup>
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

import CatalogHome from "@/components/home/CatalogHome.vue";
import OltinBaliqIcon from "@/components/icons/OltinBaliqIcon.vue";
import UserCardHome from "@/components/home/UserCardHome.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

import {hasOwnProperty} from "@/utils/object.util";
import {WebAppController} from "@/utils/telegram/web.app.util";
import {localStorageController} from "@/utils/localstorage.util";
import {useTelegram} from "@/composables/telegram.composable";
import {loadingComposable} from "@/composables/loading.composable";

import {ACCEPT_LANGUAGE, USER_DATA} from "@/constants";
import {useTelegramStore} from "@/stores/telegram.store";
import VoteModal from "@/views/vote/VoteModal.vue";
import {profileApi} from "@/services/profile.service";

const {tUserFullName} = useTelegramStore();
const {tUserUniqueId, checkTelegramUser} = useTelegram();

const router = useRouter();
const {locale, t} = useI18n();
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
})

const getMe = async () => {
  try {
    const {data: {result}} = await profileApi.fetchMe()
    user.value.id = result.id || tUserUniqueId
    user.value.fullName = (result.first_name || result.last_name) ? (result.first_name + ' ' + result.last_name) : tUserFullName
    user.value.avatar = result.upload?.path || '@/assets/images/profile-image.svg'
    localStorageController.set(ACCEPT_LANGUAGE, result.language);
    localStorageController.set(USER_DATA, result);
  } catch (e) {
    console.log(e, 'e');
  }
}


onMounted(async () => {
  try {
    startLoading();
    const data = await checkTelegramUser();
    const hasUser = hasOwnProperty(data, "user");
    if (hasUser) {
      const hasLanguage = hasOwnProperty(data.user, "language");
      if (hasLanguage) {
        locale.value = data.user.language;
      }
    }
    await getMe()
    localStorageController.set(ACCEPT_LANGUAGE, locale.value);
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="app-home">
    <app-loader :active="isFetching"/>
    <user-card-home
        :user-full-name="user.fullName"
        :user-unique-id="user.id"
        :user-avatar="user.avatar"
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
        <oltin-baliq-icon/>
        <div class="flex flex-column justify-center align-center">
          <span class="ol-main-banner-message">
            {{ t("home_page.try_luck") }}
          </span>
        </div>
      </div>
    </div>

    <catalog-home/>

    <vote-modal/>
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
  white-space: nowrap;

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
    color: white;
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
