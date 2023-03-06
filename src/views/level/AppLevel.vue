<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { levelApi } from "@/services/level.service";

import LevelGifts from "@/views/level/LevelGifts.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

import LevelsStatisticsCard from "@/components/LevelsStatisticsCard/LevelsStatisticsCard.vue";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";

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

onMounted(async () => {
  startLoading();
  try {
    await getLevels();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div>
    <app-loader :active-="isFetching" />
    <div class="layout-container">
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
          <p>Получить приз</p>
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
