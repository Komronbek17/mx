<script setup>
import { ref } from "vue";
import { WebAppController } from "@/utils/telegram/web.app.util";

const sound = ref(true);
WebAppController.ready();
</script>

<template>
  <div class="sound">
    <div class="layout-container">
      <div class="sound-block">
        <div class="sound-image">
          <img v-if="sound" src="@/assets/images/sound-on-icon.svg" alt="" />
          <img v-else src="@/assets/images/volume-off.svg" alt="" />
        </div>

        <p class="sound-title">Выключить звук?</p>
        <div class="sound-btns">
          <button class="sound-btn__no">Нет</button>
          <button class="sound-btn__yes">Да</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sound {
  &-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-image {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-title {
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: #090909;
    margin-bottom: 1rem;
  }

  &-btns {
    display: flex;
    align-items: center;
    justify-content: center;

    & button {
      width: 60px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
  }

  &-btn__no {
    background: #f2fbfd;
    border-radius: 8px;
    margin-right: 1rem;
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: #090909;
  }

  &-btn__yes {
    background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #fff;
  }
}
</style>
