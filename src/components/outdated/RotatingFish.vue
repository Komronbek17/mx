<script setup>
import { ref, computed, watch } from "vue";
import "@dotlottie/player-component";

import { useTelegramStore } from "@/stores/telegram.store";
const telegramStore = useTelegramStore();

telegramStore.webApp.expand();

const props = defineProps({
  type: {
    type: String,
    default: "daily",
    validator(value) {
      return ["daily", "premium"].includes(value);
    },
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  stop: {
    type: Boolean,
    required: true,
  },
});

const fish = ref(null);
const stars = ref(null);

const computedRotatingFish = computed(() => {
  if (props.type === "daily")
    return "/img/animations/circle_fish_update.lottie";
  else if (props.type === "premium")
    return "/img/animations/circle_premium_fish.lottie";
  else return null;
});

function toggleLottieAnim() {
  if (props.stop) {
    fish.value.stop();
    stars.value.stop();
  } else {
    fish.value.play();
    stars.value.play();
  }
}

watch(
  () => props.stop,
  () => {
    toggleLottieAnim();
  }
);
</script>

<template>
  <div class="catch-fish">
    <div class="catch-fish__bubbles">
      <img src="/img/bg_bubbles.png" alt="" />
    </div>
    <div class="catch-fish__absolute-layer">
      <dotlottie-player
        ref="fish"
        :src="computedRotatingFish"
        :autoplay="autoplay"
        loop
      />
    </div>
    <div class="catch-fish__absolute-layer">
      <dotlottie-player
        ref="stars"
        src="/img/animations/stars.lottie"
        :autoplay="autoplay"
        loop
      />
    </div>
  </div>
</template>

<style scoped></style>
