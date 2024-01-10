<script setup>
import ProgressLine from "@/views/flash/elements/ProgressLine.vue";
import ProgressCircle from "@/views/flash/elements/ProgressCircle.vue";
import GlobeIcon from "@/views/flash/icons/GlobeIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

import PhoneIcon from "@/views/flash/icons/PhoneIcon.vue";
import CoinIcon from "@/views/flash/icons/CoinIcon.vue";
import SmsIcon from "@/views/flash/icons/SmsIcon.vue";
import LightningIcon from "@/views/flash/icons/LightningIcon.vue";
import { useFlashStore } from "@/stores/flash.store";
import { computed } from "vue";

const icons = {
  sms: SmsIcon,
  coin: CoinIcon,
  internet: GlobeIcon,
  minute: PhoneIcon,
  default: LightningIcon,
  used: CheckIcon,
};

const flashStore = useFlashStore();

const steps = computed(() => {
  const list = [];
  const stepMax = flashStore.details.stepMax;

  if (stepMax < flashStore.STEPS_LENGTH) {
    for (let i = 0; i < stepMax; i++) {
      list.unshift({
        type: "used",
        qty: "",
      });
    }
  }

  flashStore.packages.forEach((pItem) => {
    list.push(pItem);
  });

  const neededLength = flashStore.STEPS_LENGTH - list.length;

  for (let i = 0; i < neededLength; i++) {
    list.push({
      type: "default",
      qty: "",
    });
  }

  return list;
});

function toggleActivation(step) {
  if (step.selected) {
    flashStore.deselectPackage(step);
  }
}
</script>

<template>
  <div>
    <div class="flash__progress__step">
      <div class="flash__progress__step__content">
        <template
          v-for="(step, stepIndex) in steps"
          :key="step.type + stepIndex"
        >
          <div
            class="flash__progress__step__main"
            :class="{
              flash__progress__first__line: !stepIndex,
            }"
          >
            <progress-line
              v-if="stepIndex"
              :active="!['default'].includes(step.type)"
            />
            <div
              class="flash__progress__circle__wrapper"
              @click="toggleActivation(step)"
            >
              <progress-circle :active="!['default'].includes(step.type)">
                <template #icon>
                  <component :is="icons[step.type]" />
                </template>
              </progress-circle>
            </div>
            <span class="flash__progress__value">
              {{ step.qty }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flash__progress__step {
  &__content {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
}

.flash__progress__circle {
  position: relative;

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.flash__progress__step__main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  row-gap: 1rem;
}

.flash__progress__first__line {
  grid-template-columns: 1fr;

  .flash__progress__value {
    grid-column: 1;
  }
}

.flash__progress__value {
  height: 1.25rem;
  grid-column: 2;
}
</style>
