<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { levelApi } from "@/services/level.service";
import { levelV2Api } from "@/services/levelV2.service";

import LevelGifts from "@/views/level/LevelGifts.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import AppBottomSheet from "@/components/elements/bottomSheet/AppBottomSheet.vue";

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
import { coinApi } from "@/services/coin.service";

const { t } = useI18n();
const toast = useToast();

const levels = ref([]);

const activeLevel = ref(0);
const giftListByLevel = ref([]);

const giftBottomSheet = ref(null);

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

function openGiftBottomSheet() {
  giftBottomSheet.value.open();
}

async function closeGiftBottomSheet() {
  giftBottomSheet.value.close();
  await getLevelV2();
  await getLevelPrizesV2();
}

const isDecimal = (number) => {
  if (number % 1 !== 0) {
    return number.toFixed(2);
  } else {
    return number;
  }
};

const getLevelV2 = async () => {
  try {
    const { data } = await levelV2Api.fetchLevels();
    levels.value = data.data.map((item) => {
      return {
        ...item,
        score: isDecimal((item.balance / item["max_score"]) * 100),
      };
    });
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

const getLevelPrizesV2 = async (levelId) => {
  const body = {
    level_id: levelId || 1,
    page: 1,
    limit: 200,
  };
  startLoading();
  try {
    const { data } = await levelV2Api.fetchLevelPrizes(body);
    giftListByLevel.value = data.data.list;
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
    finishLoading();
  }
};

const activateLevel = async (id) => {
  activeLevel.value = id;
  await getLevelPrizesV2(id + 1);
};

// const getLevels = async () => {
//   try {
//     const { data } = await levelApi.fetchLevelsWithFloat();
//     levels.value = data;
//   } catch ({ response }) {
//     toast.error(response?.data?.message);
//   }
// };

const getLevelGiftV2 = async (id) => {
  try {
    await levelV2Api.getPrize({ level_id: id });
    openGiftBottomSheet();
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

// const getLevelGift = async (id) => {
//   try {
//     const { data } = await levelApi.fetchGift(id);
//     levels.value = data;
//   } catch ({ response }) {
//     toast.error(response?.data?.message);
//   }
// };

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
    // await getLevels();
    await getLevelV2();
    await getLevelPrizesV2();
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
          @click="getLevelGiftV2(levels[activeLevel].id)"
          class="levels-button"
          :class="levels[activeLevel]?.score >= 100 ? '' : 'disabled'"
          :disabled="levels[activeLevel]?.score < 100"
        >
          <img src="@/assets/images/prize.svg" alt="" />
          <p>{{ t("level_page.take_prize") }}</p>
        </button>

        <div v-if="levels[activeLevel]">
          <level-gifts
            :levels="giftListByLevel"
            :key="levels[activeLevel].id + '_level'"
          />
        </div>
      </div>
    </div>

    <!--  GETTING GIFT BOTTOM SHEET  -->
    <app-bottom-sheet ref="giftBottomSheet" max-height="300px">
      <div class="p-1 pt-0-5">
        <div class="bottom-sheet__image">
          <img src="@/assets/icons/clock.svg" alt="" />
        </div>

        <div class="bottom-sheet__block">
          <p>{{ t("level_page.sheet_title") }}</p>
          <span>{{ t("level_page.sheet_description") }}</span>
        </div>

        <button @click="closeGiftBottomSheet" class="bottom-sheet__btn">
          {{ t("approve") }}
        </button>
      </div>
    </app-bottom-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import "./level-style.scss";

.policy-sheet-title {
  @extend .text-16-500;
  color: var(--text-main);
}

.bottom-sheet__image {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.bottom-sheet__block {
  & p {
    @extend .heading-2;
    color: var(--text-main);
    text-align: center;
    margin-bottom: 0.75rem;
  }

  & span {
    @extend .text-16-500;
    color: var(--text-main);
    text-align: center;
    display: block;
  }
}

.bottom-sheet__btn {
  @extend .text-16-500;
  background: var(--gradient-green);
  color: var(--gf-text-white-2x);
  width: 100%;
  height: 40px;
  border-radius: 1rem;
  margin-top: 1rem;
}
</style>
