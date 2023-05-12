<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ordersApi } from "@/services/orders.service";
import { formatDateWithDot } from "@/utils/date.formatter";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import AppBottomSheet from "@/components/elements/bottomSheet/AppBottomSheet.vue";
import { coinApi } from "@/services/coin.service";
import { toastErrorMessage } from "@/utils/error.util";
import { keys } from "@/utils/object.util";
import AppOrderPreview from "@/views/profile/order-history/AppOrderPreview.vue";

const { t } = useI18n();

let prizeBonuses = ref([]);

const orders = reactive({
  previewItem: {},
});

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const {
  loading: isOrderItemFetching,
  startLoading: startLoadingOrderItem,
  finishLoading: finishLoadingOrderItem,
} = loadingComposable();

const pagination = ref({
  current: 1,
  limit: 10,
});

const loading = ref(false);

const showPreviewItem = computed(() => keys(orders.previewItem).length);

async function getActiveOrders() {
  const body = {
    page: pagination.value.current,
    limit: pagination.value.limit,
    is_active: 1,
  };
  const {
    data: { result, pagination: restPagination },
  } = await ordersApi.fetchActiveOrders(body);
  for (let i = 0; i < result.length; i++) {
    prizeBonuses.value.push(result[i]);
  }
  pagination.value = Object.assign(pagination.value, restPagination);
}

const orderDetailsSheet = ref(null);

function openBottomSheet() {
  orderDetailsSheet.value.open();
}

function closeBottomSheet() {
  orderDetailsSheet.value.close();
}

async function viewOrderDetails(orderItemId) {
  try {
    openBottomSheet();
    orders.previewItem = {};
    startLoadingOrderItem();
    const response = await coinApi.orderFindOne({
      body: { id: orderItemId },
    });
    orders.previewItem = response.data.result;
  } catch (e) {
    closeBottomSheet();
    toastErrorMessage(e);
  } finally {
    finishLoadingOrderItem();
  }
}

function formatCreatedTime(t) {
  const d = t.replace(" ", "T");
  return formatDateWithDot(d);
}

function loadMore() {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      getActiveOrders();
    }
    loading.value = false;
  }, 500);
}

const checkScrollFunction = () => {
  const listElm = document.getElementById("infinite-list");
  // eslint-disable-next-line no-unused-vars
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

onMounted(async () => {
  startLoading();
  try {
    await getActiveOrders();
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
          @click="viewOrderDetails(item.id)"
        >
          <div class="prize-image">
            <img src="@/assets/images/bonus-prize.svg" alt="" />
          </div>
          <div class="prize-item__details">
            <p>{{ t("market_page.order") }} №{{ item.id }}</p>
            <p class="prize-level">{{ formatCreatedTime(item.date) }}</p>
          </div>
          <p class="prize-status" :style="`color: ${item.color}`">
            {{ item.status }}
          </p>
        </div>
      </div>
    </div>
    <app-bottom-sheet
      height="100%"
      ref="orderDetailsSheet"
      :click-to-close="true"
    >
      <app-loader :active="isOrderItemFetching"></app-loader>

      <div v-if="showPreviewItem">
        <AppOrderPreview
          @close-bottom-sheet="closeBottomSheet"
          :preview-data="orders.previewItem"
        />
      </div>
    </app-bottom-sheet>
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
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &__details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 70%;

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

  &-status {
    @extend .text-14-500;
    text-align: right;
  }
}
</style>
