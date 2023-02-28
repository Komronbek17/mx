<script setup></script>

<template>
  <div class="history">
    <div class="history-block">
      <div class="history-tabs">
        <router-link to="#" class="history-tab">Активные</router-link>
        <router-link to="#" class="history-tab">Недавние</router-link>
        <router-link to="#" class="history-tab">Призы</router-link>
        <router-link to="#" class="history-tab">Архив</router-link>
        <router-link to="#" class="history-tab">Архив</router-link>
      </div>
    </div>
    <div class="layout-container"></div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.history {
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
    padding: 1rem 1rem 12px;
    overflow-x: auto;
    white-space: nowrap;
  }

  &-tab {
    position: relative;
    font-weight: 600;
    font-size: 17px;
    line-height: 129%;
    background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-decoration: none;
    z-index: 1232;
    padding: 0 20px;

    &::after {
      content: "";
      position: absolute;
      bottom: -14px;
      display: block;
      width: 100%;
      background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
      height: 2px;
      border-radius: 100px;
    }
  }
}
</style>
