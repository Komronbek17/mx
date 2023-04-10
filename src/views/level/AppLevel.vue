<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { levelApi } from "@/services/level.service";

import LevelGifts from "@/views/level/LevelGifts.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

import LevelsStatisticsCard from "@/components/LevelsStatisticsCard/LevelsStatisticsCard.vue";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import { useI18n } from "vue-i18n";
import { profileApi } from "@/services/profile.service";
import { localStorageController } from "@/utils/localstorage.util";
import { ACCEPT_LANGUAGE, USER_DATA } from "@/constants";
import { useTelegramStore } from "@/stores/telegram.store";
import { useTelegram } from "@/composables/telegram.composable";
import UserCardHome from "@/components/home/UserCardHome.vue";
import { coinApi } from "@/services/market.service";

const { t } = useI18n();
const toast = useToast();

const levels = ref([]);

const activeLevel = ref(0);

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const getLevels = async () => {
  try {
    const { data } = await levelApi.fetchLevelsWithFloat();
    levels.value = data;
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

const activateLevel = (id) => {
  activeLevel.value = id;
};

const getLevelGift = async (id) => {
  try {
    const { data } = await levelApi.fetchGift(id);
    levels.value = data;
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

const { tUserFullName } = useTelegramStore();
const { tUserUniqueId } = useTelegram();

const user = ref({
  id: "",
  fullName: "",
  avatar: null,
});

const getMe = async () => {
  try {
    const {
      data: { result },
    } = await profileApi.fetchMe();
    user.value.id = result.id || tUserUniqueId;
    user.value.fullName =
      result.first_name || result.last_name
        ? result.first_name + " " + result.last_name
        : tUserFullName;
    user.value.avatar = result.upload?.path || "";
    localStorageController.set(ACCEPT_LANGUAGE, result.language);
    localStorageController.set(USER_DATA, result);
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message);
  }
};

async function sendRefreshLevel() {
  startLoading();
  try {
    const { data } = await levelApi.refreshLevels();
    levels.value = data;
  } catch (e) {
    toast.error(e?.response.data.message ?? e.message);
  } finally {
    finishLoading();
  }
}

const balance = ref(null);

const fetchBalance = async () => {
  try {
    await coinApi.getBalance().then((response) => {
      balance.value = response.data.balance;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};

onMounted(async () => {
  startLoading();
  try {
    await getMe();
    await fetchBalance();
    await getLevels();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div>
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <user-card-home
        :user-full-name="user.fullName"
        :user-unique-id="user.id"
        :user-avatar="user.avatar"
        :refresh-level="true"
        @send-refresh="sendRefreshLevel()"
        class="mb-1"
      />

      <div class="levels-page">
        <div class="levels-list">
          <levels-statistics-card
            v-for="(level, index) in levels"
            :key="index"
            :level="level"
            :index="index"
            :active-index="activeLevel"
            :class="[
              { 'level-card__active': index === activeLevel },
              `level-card__n${index}`,
            ]"
            @click="activateLevel(index)"
          />
        </div>

        <button
          @click="getLevelGift(levels[activeLevel].id)"
          class="levels-button"
          :class="levels[activeLevel] !== 100 ? 'disabled' : ''"
          :disabled="levels[activeLevel] !== 100"
        >
          <img src="@/assets/images/prize.svg" alt="" />
          <p>{{ t("level_page.take_prize") }}</p>
        </button>

        <div v-if="levels[activeLevel]">
          <level-gifts
            :levels="levels[activeLevel].gifts"
            :key="levels[activeLevel].id + '_level'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./level-style.scss";
</style>
