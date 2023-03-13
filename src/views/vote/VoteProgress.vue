<script setup>

import {computed} from "vue";

const props = defineProps({
  activeIndex: {
    type: Number,
    required: true,
  },
  totalLength: {
    type: Number,
    required: true,
  }
})

const activePercent = computed(() => {
  return props.activeIndex / props.totalLength * 100
})


</script>

<template>
  <div class="vote-progress">
    <h5 class="vote-count">
      Вопрос {{ activeIndex }} из {{ totalLength }}
    </h5>
    <div class="vote-bar">
      <div class="vote-bar__line"/>
      <div class="vote-bar__line-active" :style="`width:${activePercent}%`"/>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.vote-progress {
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
}

.vote-count {
  @extend .font-15-dark;
}

.vote-bar {
  display: flex;
  position: relative;

  &__line {
    height: 10px;
    width: 100%;
    background: #F5F5F5;
    border-radius: 16px;

    &-active {
      position: absolute;
      height: 10px;
      background: linear-gradient(180deg, #00BBF9 0%, #00A3FF 100%);
      border-radius: 16px;
      top: 0;
      left: 0;
    }
  }

}
</style>