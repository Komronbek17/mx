<script setup>
import { ref } from "vue";
// import { historyApi } from "@/services/history.service";
let recentBonuses = ref([]);
console.log(recentBonuses.value);

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
</script>

<template>
  <div class="recent">
    <div class="layout-container">
      <div class="recent-items">
        <div class="recent-item">
          <div class="recent-image">
            <img src="@/assets/images/bonus-2x-icon.svg" alt="" />
          </div>
          <div class="recent-item__details">
            <p>2Х Мегабайты</p>
            <span>Осталось 10 часов</span>
          </div>
          <p class="recent-level">1 уровень</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recent {
  &-item {
    display: flex;
    align-items: center;
  }

  &-image {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  }
}
</style>
