<script setup>
// import { historyApi } from "@/services/history.service";
// let history = ref({});

// const getActiveBonuses = async () => {
//   const response = await historyApi.fetchActiveHistories({
//     params: {
//       page: 1,
//     },
//   });
//   history.value = response.data.items;
//   console.log(history.value);
// };

// getActiveBonuses();

import { WebAppController } from "@/utils/telegram/web.app.util";

WebAppController.ready();
</script>

<template>
  <div class="active">
    <div class="layout-container">
      <div class="active-items">
        <div class="active-item">
          <img src="@/assets/images/bonus-2x-icon.svg" alt="" />
          <div class="active-item__details">
            <p>2Х Мегабайты</p>
            <span>Осталось 10 часов</span>
          </div>
          <p class="active-level"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  &-item {
    & img {
    }
  }
}
</style>
