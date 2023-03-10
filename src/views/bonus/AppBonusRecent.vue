<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { historyApi } from "@/services/history.service";
import { WebAppController } from "@/utils/telegram/web.app.util";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { loadingComposable } from "@/composables/loading.composable";

const { t } = useI18n();
let recentBonuses = ref([]);

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const pagination = ref({
  current: 1,
  limit: 10,
});
const loading = ref(false);

const getRecentBonuses = async () => {
  const body = {
    method: "coin.get_recent_histories",
    params: {
      page: pagination.value.current,
      limit: pagination.value.limit,
    },
  };
  const { data } = await historyApi.fetchRecentHistories(body);
  recentBonuses.value = [...recentBonuses.value, ...data.items];
  pagination.value = Object.assign(pagination.value, data.pagination);
};

function filterBonusType(item) {
  if (item === "sms") {
    return t("bonus_types.sms");
  } else if (item === "internet") {
    return t("bonus_types.internet");
  } else {
    return t("bonus_types.minutes");
  }
}

function filterBonusLevel(item) {
  if (item === 1) {
    return t("prize_levels.1");
  } else if (item === 2) {
    return t("prize_levels.2");
  } else {
    return t("prize_levels.3");
  }
}

function loadMore() {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      getRecentBonuses();
    }
    loading.value = false;
  }, 500);
}

const checkScrollFunction = () => {
  const listElm = document.getElementById("infinite-list");
  listElm.addEventListener("scroll", () => {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      if (pagination.value.next) {
        loadMore();
      }
    }
  });
  // Initially load some items.
  loadMore();
};

onMounted(() => {
  startLoading();
  try {
    getRecentBonuses();
    checkScrollFunction();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="recent">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div class="recent-items" id="infinite-list">
        <div
          v-for="item in recentBonuses"
          :key="item.id"
          class="recent-item"
          :class="'recent-item-' + `${item.step}`"
        >
          <div class="recent-image">
            <img
              v-if="item.step === 1"
              src="@/assets/images/bonus-2x-icon.svg"
              alt=""
            />
            <img
              v-else-if="item.step === 2"
              src="@/assets/images/bonus-2x-icon-orange.svg"
              alt=""
            />
            <img v-else src="@/assets/images/bonus-2x-icon-green.svg" alt="" />
          </div>
          <div class="recent-item__details">
            <p>{{ item.name }}</p>
            <span>{{ filterBonusType(item.type) }}</span>
          </div>
          <p class="recent-level" :class="'recent-level-' + `${item.step}`">
            {{ filterBonusLevel(item.step) }}
          </p>
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
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      & p {
        @extend .text-15-600;
        letter-spacing: -0.4px;
        color: var(--text-main);
        margin-bottom: 6px;
      }

      & span {
        @extend .text-14-400;
        color: var(--text-secondary);
      }
    }

    &-level {
      @extend .text-14-500;
      text-align: right;
    }

    &-1 {
      .recent-image {
        background: linear-gradient(145.01deg, rgba(114, 67, 160, 0.1) 0%, rgba(149, 48, 235, 0.1) 100%);
      }

      .recent-level {
        background: var(--gradient-purple);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        white-space: nowrap;
      }
    }

    &-2 {
      .recent-image {
        background: rgba(250, 193, 0, 0.1);
      }

      .recent-level {
        background: var(--gradient-orange);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        white-space: nowrap;
      }
    }

    &-3 {
      .recent-image {
        background: rgba(0, 203, 106, 0.1);
      }

      .recent-level {
        background: var(--gradient-green);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        white-space: nowrap;
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
    border-radius: 8px;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  }
}
</style>
