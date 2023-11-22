<script setup>
import { computed } from "vue";
import { formatToPrice } from "@/utils/number.util";
import { useI18n } from "vue-i18n";
import lightningLottie from "@/assets/lottie/lightning.json";
import { Vue3Lottie } from "vue3-lottie";
import CircleProgressWithoutLightning from "@/views/flash/icons/CircleProgressWithoutLightning.vue";

const props = defineProps({
  me: {
    type: Object,
    required: true,
  },
  userBalance: {
    type: [Number, String],
    required: true,
  },
});

const { t } = useI18n();

const phoneNumber = computed(() => {
  if (props.me.phone) {
    let p = props.me.phone.trim();
    if (p.startsWith("998")) {
      p = p.replace("998", "");
    }

    return `${p.slice(0, 2)}
            ${p.slice(2, 5)}-
            ${p.slice(5, 7)}-
            ${p.slice(7)}
            `;
  }

  return "99 xxx-xx-xx";
});
</script>

<template>
  <div class="flash__header">
    <div>
      <div class="flash__progress__circle__wrapper">
        <Vue3Lottie
          :no-margin="true"
          class="flash__lightning"
          :scale="4"
          :animation-data="lightningLottie"
          :auto-play="true"
          :loop="true"
        />
        <circle-progress-without-lightning />
      </div>
    </div>
    <span class="flex flex-column row-gap-0-5 justify-center">
      <span class="flash__header__title">
        <span class="mr-0-5">{{ t("in_balance") }}</span>
        <span>{{ phoneNumber }}:</span>
      </span>
      <span class="flash__header__balance">
        {{ formatToPrice(props.userBalance) }} {{ t("uzs") }}
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.flash__header {
  position: relative;
  display: grid;
  grid-template-areas:
    "icon title"
    "icon balance";
  justify-content: start;
  column-gap: 1rem;
  margin-bottom: 1.5rem;

  &__icon {
    grid-area: icon;
    justify-self: start;
  }

  &__title {
    grid-area: title;
  }

  &__balance {
    grid-area: balance;
  }
}

.flash__progress__circle__wrapper {
  z-index: 1;
}

.flash__lightning {
  position: absolute;
  //top: -40%;
  left: -1rem;
  //height: 10rem;
  z-index: 2;
  width: 3.5rem;
  transform: rotate(90deg);
}
</style>
