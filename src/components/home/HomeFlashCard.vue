<script setup>
import { Vue3Lottie } from "vue3-lottie";
import FlashIcon from "@/components/icons/FlashIcon.vue";
import lightningLottie from "@/assets/lottie/lightning.json";
</script>

<template>
  <div class="flash-wrapper">
    <div class="background"></div>
    <div class="home-flash-card">
      <div class="home-flash-card-main flex align-center justify-center">
        <span>Flash</span>
        <FlashIcon />
      </div>
    </div>
    <Vue3Lottie
      :no-margin="true"
      class="flash-animation"
      :scale="1"
      :animation-data="lightningLottie"
      :auto-play="true"
      :loop="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.background {
  //filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  border-radius: 0.5rem;
  z-index: 1;
}

.flash-wrapper {
  cursor: pointer;
  user-select: none;
  position: relative;
  //min-width: 20rem;
  width: 100%;
  height: 5.625rem;
  //height: 5.625rem;
  //height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--gradient-purple);
  overflow: hidden;
}

.home-flash-card {
  &-main {
    //display: flex;
    //align-items: center;
    position: absolute;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    left: 50%;
    color: var(--light-neutral-white, #fff);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 122.222% */
    letter-spacing: -0.4px;
  }
}

.flash-animation {
  width: 100%;
  //width: 20rem;
  //height: 200px;
  position: absolute;
  top: 70%;
  transform: translateY(-50%);
  //top: -0.7rem;
  //left: -2rem;
}
</style>
