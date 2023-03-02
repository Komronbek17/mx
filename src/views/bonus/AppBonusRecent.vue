<script setup>
import { ref } from "vue";
import { historyApi } from "@/services/history.service";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
let recentBonuses = ref([]);

const getRecentBonuses = async () => {
  const response = await historyApi.fetchRecentHistories({});
  recentBonuses.value = response.data.items;
};

function filterBonusType(item) {
  if (item === "sms") {
    return t("bonus_types.sms");
  } else if (item === "minutes") {
    return t("bonus_types.minutes");
  } else {
    return t("bonus_types.internet");
  }
}

getRecentBonuses();
</script>

<template>
  <div class="recent">
    <div class="layout-container">
      <div class="recent-items">
        <div v-for="item in recentBonuses" :key="item.id" class="recent-item">
          <div class="recent-image">
            <img src="@/assets/images/bonus-2x-icon.svg" alt="" />
          </div>
          <div class="recent-item__details">
            <p>{{ item.name }}</p>
            <span>{{ filterBonusType(item.type) }}</span>
          </div>
          <!--          <p class="recent-level">1 уровень</p>-->
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
}
</style>
