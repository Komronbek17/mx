<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { formatDateWithDot } from "@/utils/date.formatter";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { ordersApi } from "@/services/orders.service";

const { t } = useI18n();
let prizeBonuses = ref([]);
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

const getOrderHistory = async () => {
  const body = {
    page: pagination.value.current,
    limit: pagination.value.limit,
    is_active: 0,
  };
  const { data } = await ordersApi.fetchOrdersHistory(body);
  prizeBonuses.value = data.items;
  pagination.value = Object.assign(pagination.value, data.pagination);
};

function formatCreatedTime(t) {
  const d = t.replace(" ", "T");
  return formatDateWithDot(d);
}

function loadMore() {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      getOrderHistory();
    }
    loading.value = false;
  }, 500);
}

const checkScrollFunction = () => {
  const listElm = document.getElementById("infinite-list");
  // eslint-disable-next-line no-unused-vars
  listElm.addEventListener("scroll", (e) => {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      if (pagination.value.next) {
        loadMore();
      }
    }
  });
  // Initially load some items.
  loadMore();
};

onMounted(async () => {
  startLoading();
  try {
    await getOrderHistory();
    checkScrollFunction();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="prize">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div class="prize-items" id="infinite-list">
        <div
          v-for="item in prizeBonuses"
          :key="item.id"
          class="prize-item"
          :class="'prize-item-' + `${item.level}`"
        >
          <div class="prize-image">
            <img src="@/assets/images/bonus-prize.svg" alt="" />
          </div>
          <div class="prize-item__details">
            <p>{{ item.name }}</p>
            <span>{{ filterPrizeLevel(item.level) }}</span>
          </div>
          <p class="prize-level">{{ formatCreatedTime(item.created_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prize {
  width: 100%;
  display: block;
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
        @extend .text-15-600;
        letter-spacing: -0.4px;
        color: var(--text-main);
        margin-bottom: 6px;
      }

      & span {
        @extend .text-14-400;
      }
    }

    &-1 {
      .prize-item__details span {
        background: var(--gradient-purple);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        white-space: nowrap;
      }
    }

    &-2 {
      .prize-item__details span {
        background: var(--gradient-orange);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        white-space: nowrap;
      }
    }

    &-3 {
      .prize-item__details span {
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
    background-color: var(--accent-gray);
    border-radius: 8px;

    & img {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }
  }

  &-level {
    @extend .text-14-500;
    color: var(--text-secondary);
  }
}
</style>
