<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { WebAppController } from "@/utils/telegram/web.app.util";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { formatDateWithDot } from "@/utils/date.formatter";
import { bonusHistory } from "@/services/bonusHistory.service";

const { t } = useI18n();
let recentBonuses = ref([]);

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const pagination = ref({
  current: 1,
  limit: 15,
});
const loading = ref(false);

// const getRecentBonuses = async () => {
//   const body = {
//     method: "coin.get_recent_histories",
//     params: {
//       page: pagination.value.current,
//       limit: pagination.value.limit,
//     },
//   };
//   const { data } = await historyApi.fetchRecentHistories(body);
//   recentBonuses.value = [...recentBonuses.value, ...data.items];
//   pagination.value = Object.assign(pagination.value, data.pagination);
// };

const getRecentBonuses = async () => {
  const body = {
    page: pagination.value.current,
    limit: pagination.value.limit,
    status: "inactive",
  };
  const { data } = await bonusHistory.fetchActiveBonuses(body);
  recentBonuses.value = [...recentBonuses.value, ...data.data.list];
  pagination.value = Object.assign(pagination.value, data.data.pagination);
};

function formatCreatedTime(t) {
  const d = t.replace(" ", "T");
  return formatDateWithDot(d);
}

function filterBonusType(item) {
  if (item === "sms") {
    return t("bonus_types.sms");
  } else if (item === "internet") {
    return t("bonus_types.internet");
  } else {
    return t("bonus_types.minutes");
  }
}

// function filterBonusLevel(item) {
//   if (item === 1) {
//     return t("prize_levels.1");
//   } else if (item === 2) {
//     return t("prize_levels.2");
//   } else {
//     return t("prize_levels.3");
//   }
// }

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
          :class="'recent-item-' + `${item.package.name}`"
        >
          <div class="recent-image">
            <img
              v-if="item.package.name === 'sms'"
              src="@/assets/images/sms.svg"
              alt=""
            />
            <img
              v-else-if="item.package.name === 'internet'"
              src="@/assets/images/internet-mb.svg"
              alt=""
            />
            <img v-else src="@/assets/images/minutes.svg" alt="" />
          </div>
          <div class="w-100">
            <div class="recent-item__details">
              <p>
                {{ filterBonusType(item.package.name) }}
              </p>
              <span
                >{{ item.package.name.toUpperCase() }}
                {{ item.package.qty }}</span
              >
            </div>
            <div class="recent-item__details">
              <p>{{ $t("bonus_page.source") }}:</p>
              <span>{{ item.service }}</span>
            </div>
            <div class="recent-item__details">
              <p>{{ $t("bonus_page.received") }}:</p>
              <span>{{ item.package["activation_at"] }}</span>
            </div>
            <div class="recent-item__details">
              <p>{{ $t("bonus_page.active_to") }}:</p>
              <span>{{ item.package["deactivation_at"] }}</span>
            </div>
          </div>
          <!--          <p class="recent-level" :class="'recent-level-' + `${item.step}`">-->
          <!--            {{ formatCreatedTime(item.created_at) }}-->
          <!--          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recent {
  &-item {
    display: flex;
    align-items: flex-start;
    margin-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed var(--gf-text-secondary-gray-2x);

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    &__details {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      & p {
        @extend .text-15-600;
        letter-spacing: -0.4px;
        color: var(--gf-text-33);
        margin-bottom: 6px;
      }

      & span {
        @extend .text-15-600;
        color: var(--text-secondary);
      }
    }

    &-level {
      @extend .text-14-500;
      text-align: right;
    }

    &-sms {
      .recent-image {
        background: rgba(250, 193, 0, 0.1);
      }

      .recent-level {
        color: var(--gf-text-secondary-gray-2x);
        //-webkit-background-clip: text;
        //-webkit-text-fill-color: transparent;
        //background-clip: text;
        //text-fill-color: transparent;
        //white-space: nowrap;
      }
    }

    &-internet {
      .recent-image {
        background: rgba(0, 139, 255, 0.1);
      }

      .recent-level {
        color: var(--gf-text-secondary-gray-2x);
        //-webkit-background-clip: text;
        //-webkit-text-fill-color: transparent;
        //background-clip: text;
        //text-fill-color: transparent;
        //white-space: nowrap;
      }
    }

    &-voice {
      .recent-image {
        background: rgba(0, 203, 106, 0.1);
      }

      .recent-level {
        color: var(--gf-text-secondary-gray-2x);
        //-webkit-background-clip: text;
        //-webkit-text-fill-color: transparent;
        //background-clip: text;
        //text-fill-color: transparent;
        //white-space: nowrap;
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
