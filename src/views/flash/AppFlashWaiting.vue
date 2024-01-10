<script setup>
import { Vue3Lottie } from "vue3-lottie";
import CircleProgressWithoutLightning from "@/views/flash/icons/CircleProgressWithoutLightning.vue";
import flashWaitingAnimation from "@/assets/lottie/flashWaitingAnimation.json";
import lightningLottie from "@/assets/lottie/lightning.json";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { onMounted, ref } from "vue";
import { useFlashStore } from "@/stores/flash.store";
import { useUserStore } from "@/stores/user.store";

const userStore = useUserStore();
const flashStore = useFlashStore();
const fetching = ref(false);
onMounted(() => {
  setTimeout(async () => {
    try {
      fetching.value = true;
      await flashStore.send({
        userId: userStore.meUniqueId,
      });
    } finally {
      fetching.value = false;
    }
  }, 1000);
});

WebAppController.ready();
</script>

<template>
  <div class="flash__waiting flex justify-center align-center">
    <div class="flash__progress__circle__wrapper">
      <Vue3Lottie
        :no-margin="true"
        class="flash__lightning"
        :scale="7"
        :animation-data="lightningLottie"
        :auto-play="true"
        :loop="true"
      />
      <circle-progress-without-lightning />
    </div>
    <Vue3Lottie
      :no-margin="true"
      :scale="1"
      :animation-data="flashWaitingAnimation"
      :auto-play="true"
      :loop="true"
    />
  </div>
</template>
<style lang="scss" scoped>
* {
  color: var(--text-main);
}

.flash__waiting {
  height: 100vh;
  position: relative;
}

.flash__progress__circle__wrapper {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flash__lightning {
  position: absolute;
  left: -0.5rem;
  top: 0.5rem;
  //top: 40%;
  //left: 30%;
  z-index: 2;
  transform: rotate(60deg);
  //width: 10%;
  //height: 20%;
}
</style>
