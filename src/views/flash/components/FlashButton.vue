<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Vue3Lottie } from "vue3-lottie";
import { useFlashStore } from "@/stores/flash.store";
import lightningLottie from "@/assets/lottie/lightning.json";
import { useI18n } from "vue-i18n";

const iconColors = {
  active: "rgba(250, 204, 21, 1)",
  initial: "var(--text-secondary)",
};

const router = useRouter();
const flashStore = useFlashStore();
const { t } = useI18n();

const iconColor = computed(() => {
  return flashStore.isReadyToSubmit ? iconColors.active : iconColors.initial;
});

const startAnimate = ref(false);

function givePackageCollection() {
  if (
    flashStore.isReadyToSubmit &&
    !(flashStore.sending && startAnimate.value)
  ) {
    startAnimate.value = !startAnimate.value;

    setTimeout(async () => {
      await router.push({
        name: "flash-waiting",
      });
    }, 1000);
  }
}
</script>

<template>
  <div
    class="flash__button"
    :class="{
      flash_button__animate: startAnimate,
    }"
    @click="givePackageCollection"
  >
    <span
      class="flash__button__toggle"
      :class="{
        toggle__active: flashStore.isReadyToSubmit,
        toggle__animate: startAnimate,
      }"
    >
      <svg
        class="flash__button__lightning__icon"
        :class="{
          flash__button__lightning__icon__animate: startAnimate,
        }"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6588 28H13.3255L14.6588 18.6667H9.99215C8.81882 18.6667 9.55215 17.6667 9.57882 17.6267C11.2988 14.5867 13.8855 10.0533 17.3388 4H18.6721L17.3388 13.3333H22.0188C22.5522 13.3333 22.8455 13.5867 22.5521 14.2133C17.2855 23.4 14.6588 28 14.6588 28Z"
          :fill="iconColor"
        />
      </svg>
    </span>

    <span class="flash__button__text">
      <span
        v-if="flashStore.hasReachedMin"
        class="flash__button__text__default"
        :class="{ flash__button__text__disabled: flashStore.hasExceeded }"
      >
        {{ t("activate_flash") }}
      </span>
      <span v-else class="flash__button__text__disabled">
        {{ t("select_min_options", { min: flashStore.details.stepMin }) }}
      </span>
    </span>

    <Vue3Lottie
      :no-margin="true"
      class="flash__button__lightning"
      :scale="1"
      :animation-data="lightningLottie"
      :auto-play="true"
      :loop="true"
      :class="{
        lightning__animate: startAnimate,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.flash__button {
  width: 100%;
  height: 2.75rem;
  color: var(--text-main);
  background: var(--accent-gray);
  cursor: pointer;
  user-select: none;
  margin-bottom: 0.25rem;

  background: linear-gradient(
      to left,
      var(--accent-gray) 50%,
      var(--light-gradients-blue) 50%
    )
    right;
  background-size: 200%;
  transition: all 0.7s;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 4.5rem;

  &__toggle {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%) scale(1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.7s;

    &.toggle__active {
      background-color: var(--light-gradients-blue);
    }

    &.toggle__animate {
      left: 100%;
      transform: translate(-100%, -50%) scale(1.25);
    }
  }

  &__lightning__icon {
    width: 2rem;
    height: 2rem;

    &__animate {
      transform: scale(1.25);
    }
  }
}

.flash__button__lightning {
  position: absolute;
  top: 60%;
  left: 0.5rem;
  width: 0;
  transform: translateY(-50%);

  &.lightning__animate {
    width: calc(85% - 0.5rem);
  }
}

.flash_button__animate {
  background-position: left;
}

.flash__button__text__default {
  color: var(--text-main);
}

.flash__button__text__disabled {
  color: var(--text-secondary);
}
</style>
