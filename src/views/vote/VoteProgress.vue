<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  activeIndex: {
    type: Number,
    required: true,
  },
  totalLength: {
    type: Number,
    required: true,
  },
});

const activePercent = computed(() => {
  return (props.activeIndex / props.totalLength) * 100;
});
</script>

<template>
  <div class="vote-progress">
    <h5 class="vote-count">
      <!--      Вопрос {{ activeIndex }} из {{ totalLength }}-->
      {{
        t("vote.questions_title", {
          active: activeIndex,
          total: totalLength,
        })
      }}
    </h5>
    <div class="vote-bar">
      <div class="vote-bar__line" />
      <div class="vote-bar__line-active" :style="`width:${activePercent}%`" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vote-progress {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.vote-count {
  @extend .text-15-600;
  color: var(--text-main);
}

.vote-bar {
  display: flex;
  position: relative;

  &__line {
    height: 10px;
    width: 100%;
    background: var(--accent-gray);
    border-radius: 16px;

    &-active {
      position: absolute;
      height: 10px;
      background: var(--gf-blue-gradient-01);
      border-radius: 16px;
      top: 0;
      left: 0;
    }
  }
}
</style>
