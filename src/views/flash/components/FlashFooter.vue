<script setup>
import { useFlashStore } from "@/stores/flash.store";

import OutlineRefresh2Icon from "@/components/icons/OutlineRefresh2Icon.vue";
import FlashButton from "@/views/flash/components/FlashButton.vue";
import FlashProgress from "@/views/flash/components/FlashProgress.vue";
import { useI18n } from "vue-i18n";

const flashStore = useFlashStore();
const { t } = useI18n();
</script>

<template>
  <div class="flash__content">
    <button
      v-if="flashStore.packages.length"
      @click="flashStore.resetPackages()"
      class="footer__reset__button flex justify-center align-center mb-1"
    >
      <outline-refresh2-icon />
      <span class="reset__button__text">{{ t("reset") }}</span>
    </button>

    <flash-progress />

    <div class="footer__total__row mb-1 mt-1">
      <span>{{ t("total_to_be_paid") }}:</span>
      <span>{{ flashStore.total }} {{ t("uzs") }}</span>
    </div>

    <span
      class="footer__exceeded"
      v-if="flashStore.hasReachedMin && flashStore.hasExceeded"
    >
      <span class="footer__exceeded__warning">
        {{ t("insufficient_funds") }}
      </span>
      <span class="flex align-center justify-between mt-0-5">
        <span>{{ t("you_are_missing") }}:</span>
        <span class="footer__needed__amount">
          {{ flashStore.neededAmount }} {{ t("uzs") }}
        </span>
      </span>
    </span>

    <flash-button class="mt-2" />
  </div>
</template>

<style lang="scss">
.flash__content {
  padding: 1rem 1rem 1.5rem 1rem;
}

.footer__total__row {
  display: flex;
  justify-content: space-between;
}

.footer__exceeded {
  font-size: 14px;

  &__warning {
    color: var(--accent-red);
  }
}

.footer__reset__button {
  color: var(--star-color0);
  border-radius: 0.75rem;
  background-color: var(--accent-gray);
  padding: 0.5rem;
  column-gap: 0.75rem;
  border: none;
  outline: none;
}

.reset__button__text {
  color: var(--star-color0);
}
</style>
