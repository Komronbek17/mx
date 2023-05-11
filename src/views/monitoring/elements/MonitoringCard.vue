<script setup>
import { computed } from "vue";
import { addZero, dateProperties } from "@/utils/date.formatter";

const props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
});

const earningPrice = computed(() => {
  if (props.detail.amount !== "") {
    return parseInt(props.detail.amount);
  }
  return 0;
});

function exactEarningTime() {
  const { hours, minutes } = dateProperties(props.detail.created_at, "string");
  return addZero(hours) + ":" + addZero(minutes);
}
</script>

<template>
  <div class="flex column-gap-1">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="flex flex-column ol-m-card-main pb-1 w-100">
      <div class="flex justify-between">
        <div>{{ props.detail.title }}</div>
        <div>{{ earningPrice }} FitCoin</div>
      </div>
      <div class="flex justify-between">
        <div>{{ props.detail["sub_title"] }}</div>
        <div>{{ exactEarningTime() }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-m-card-main {
  border-bottom: 1px solid var(--gf-p-main-gray);
}

.icon {
  width: 44px;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--accent-gray);
}
</style>
