<script setup>
import { defineProps } from "vue";
import ProgressStar from "@/components/ui/ProgressStar/ProgressStar.vue";
import {useI18n} from "vue-i18n";


const {t} = useI18n();

const props = defineProps({
  level: Object,
  index: Number,
  activeIndex: Number,
});


const checkLevelName = (name) => {
  const levelIndex = name.slice(-1);
  return t(`prize_levels.${levelIndex}`) || name
}


</script>

<template>
  <div class="level-card">
    <div class="level-card__star">
      <progress-star
        :index="index"
        :active-index="activeIndex"
        :percent="props.level.percent"
      />
    </div>
    <div class="level-content">
      <div class="level-card__name">
        {{ checkLevelName(props.level.name) }}
      </div>
      <div class="level-card__percent">{{ props.level.percent }} %</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./level-card.scss";
</style>
