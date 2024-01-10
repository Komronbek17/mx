<script setup>
import { useFlashStore } from "@/stores/flash.store";

import SmsIcon from "@/views/flash/icons/SmsIcon.vue";
import CoinIcon from "@/views/flash/icons/CoinIcon.vue";
import GlobeIcon from "@/components/icons/GlobeIcon.vue";
import PhoneIcon from "@/views/flash/icons/PhoneIcon.vue";
import FlashOption from "@/views/flash/components/FlashOption.vue";
import { useI18n } from "vue-i18n";

const flashStore = useFlashStore();

const icons = {
  sms: SmsIcon,
  coin: CoinIcon,
  internet: GlobeIcon,
  minute: PhoneIcon,
};

const { t } = useI18n();

function hasTheSameCost(cost) {
  const indexOfItem = flashStore.packages.findIndex(
    (item) => item.cost === cost
  );

  return indexOfItem !== -1;
}
</script>

<template>
  <div class="options__layout">
    <div class="options__label">{{ t("available_options") }}:</div>
    <div class="options__main">
      <flash-option
        v-for="(option, optIdx) in flashStore.details.flashGifts"
        :key="`option${optIdx}`"
        :option="option"
        :has-reached-max="flashStore.hasReachedMax"
        @add="flashStore.addPackage(option)"
        @remove="flashStore.removePackage(option)"
        v-model="option.selected"
        :disabled="hasTheSameCost(option.cost)"
      >
        <template #icon>
          <component :is="icons[option.type]" />
        </template>
      </flash-option>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.options {
  &__label {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.1px;
    margin-bottom: 1rem;
  }

  &__main {
    display: grid;
    grid-gap: 1rem 0.75rem;
    gap: 1rem;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  }
}
</style>
