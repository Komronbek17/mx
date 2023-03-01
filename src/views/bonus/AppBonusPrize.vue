<script setup>
import { ref } from "vue";
import { historyApi } from "@/services/history.service";
import { useI18n } from "vue-i18n";
import formatDate from "@/utils/date.formatter";

const { t } = useI18n();
let prizeBonuses = ref([]);

const getPrizeBonuses = async () => {
  const response = await historyApi.fetchPrizeHistories({});
  prizeBonuses.value = response.data.items;
};

function filterPrizeLevel(item) {
  if (item === 1) {
    return t("level_types.1");
  } else if (item === 2) {
    return t("level_types.2");
  } else {
    return t("level_types.3");
  }
}

getPrizeBonuses();
</script>

<template>
  <div class="prize">
    <div class="layout-container">
      <div class="prize-items">
        <div v-for="item in prizeBonuses" :key="item.id" class="prize-item">
          <div class="prize-image">
            <img src="@/assets/images/bonus-2x-icon.svg" alt="" />
          </div>
          <div class="prize-item__details">
            <p>{{ item.name }}</p>
            <span>{{ filterPrizeLevel(item.level) }}</span>
          </div>
          <p class="prize-level">{{ formatDate(item.created_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prizes {
  padding: 0;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    &__details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      & p {
        font-weight: 600;
        font-size: 15px;
        line-height: 133%;
        letter-spacing: -0.4px;
        color: #333333;
        margin-bottom: 6px;
      }

      & span {
        font-weight: 400;
        font-size: 14px;
        line-height: 129%;
        color: #a3abb8;
      }
    }
  }

  &-image {
    min-width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    background: rgba(0, 139, 255, 0.1);
    border-radius: 8px;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  }

  &-level {
    font-weight: 500;
    font-size: 14px;
    line-height: 129%;
    color: #a3abb8;
  }
}
</style>
