<script setup>
import { useRoute } from "vue-router";
import { WebAppController } from "@/utils/telegram/web.app.util";

const route = useRoute();
WebAppController.ready();
</script>

<template>
  <div class="history">
    <div class="history-block">
      <div class="history-tabs">
        <!--        <router-link-->
        <!--          :to="{ name: 'bonus-active', params: {} }"-->
        <!--          class="history-tab"-->
        <!--          :class="route.name === 'bonus-active' ? 'active' : ''"-->
        <!--        >-->
        <!--          Активные-->
        <!--        </router-link>-->
        <router-link
          :to="{ name: 'bonus-recent', params: {} }"
          class="history-tab"
          :class="route.name === 'bonus-recent' ? 'active' : ''"
        >
          Недавние
        </router-link>
        <router-link
          :to="{ name: 'bonus-prize', params: {} }"
          class="history-tab"
          :class="route.name === 'bonus-prize' ? 'active' : ''"
        >
          Призы
        </router-link>
        <!--        <router-link-->
        <!--          :to="{ name: 'bonus-archive', params: {} }"-->
        <!--          class="history-tab"-->
        <!--          :class="route.name === 'bonus-archive' ? 'active' : ''"-->
        <!--        >-->
        <!--          Архив-->
        <!--        </router-link>-->
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.history {
  padding: 0;

  &-block {
    position: relative;
    z-index: 0;

    &::after {
      content: "";
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      background-color: #f5f5f5;
    }
  }

  &-tabs {
    position: relative;
    padding: 0 1rem;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    column-gap: 20px;
  }

  &-tab {
    position: relative;
    font-weight: 600;
    font-size: 17px;
    line-height: 129%;
    color: #dbdbdb;
    text-decoration: none;
    z-index: 1232;
    padding: 16px 0 12px;

    &.active {
      @include text-gradient(
        linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%)
      );

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        background: linear-gradient(
          107.32deg,
          #4adaff -22.08%,
          #0062ca 122.03%
        );
        height: 2px;
        border-radius: 100px;
      }
    }
  }
}
</style>
