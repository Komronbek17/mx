<script setup>
import {computed} from "vue";
import {addZero, dateProperties} from "@/utils/date.formatter";

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
  const {hours, minutes} = dateProperties(props.detail.created_at, "string");
  return addZero(hours) + ":" + addZero(minutes);
}
</script>

<template>
  <div class="flex column-gap-1">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="flex flex-column row-gap-0-25 ol-m-card-main pb-1 w-100">
      <div class="flex justify-between">
        <div class="monitoring-title">{{ props.detail.title }}</div>
        <div
            v-if="props.detail.debit"
            class="monitoring-value debit"
        >
          +{{ earningPrice }} Fit-Coin
        </div>
        <div
            v-else
            class="monitoring-value credit"
        >
          {{ earningPrice }} Fit-Coin
        </div>
      </div>
      <div class="flex justify-between">
        <div class="monitoring-description">
          {{ props.detail["sub_title"] }}
        </div>
        <div class="monitoring-time">{{ exactEarningTime() }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.debit {
  color: var(--gf-p-green);
}

.credit {
  color: var(--accent-red);
}

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

.monitoring {
  &-title {
    @extend .text-16-600;
    color: var(--text-main);
  }

  &-description {
    @extend .text-14-400;
    color: var(--text-secondary);
  }

  &-value {
    @extend .text-14-500;
  }

  &-time {
    @extend .text-12-400;
    color: var(--text-secondary);
  }
}
</style>
