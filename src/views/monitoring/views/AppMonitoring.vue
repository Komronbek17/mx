<script setup>
import { defineAsyncComponent, onMounted, reactive } from "vue";
import { coinApi } from "@/services/coin.service";
import { toastErrorMessage } from "@/utils/error.util";
import { sortResultByDate } from "@/utils/sort.util";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import MonitoringCard from "@/views/monitoring/elements/MonitoringCard.vue";

// const PrizeIcon = defineAsyncComponent(
//   () =>
//     new Promise((resolve) =>
//       resolve(import("@/components/icons/PrizeIcon.vue"))
//     )
// );
// const AdsOneIcon = defineAsyncComponent(() =>
//   import("@/components/icons/monitoring/AdsOneIcon.vue")
// );
// const OrderCartIcon = defineAsyncComponent(() =>
//   import("@/components/icons/monitoring/OrderCartIcon.vue")
// );
// const ReferralIcon = defineAsyncComponent(() =>
//   import("@/components/icons/monitoring/ReferralIcon.vue")
// );
// const VuexyBoldStarIcon = defineAsyncComponent(() =>
//   import("@/components/icons/monitoring/VuexyBoldStarIcon.vue")
// );
// const ChecklistIcon = defineAsyncComponent(() =>
//   import("@/components/icons/monitoring/ChecklistIcon.vue.vue")
// );
// types: ["level", "ads", "referral", "premium", "shop", "vote"],
const iconsList = {
  level: defineAsyncComponent(
    () =>
      new Promise((resolve) =>
        resolve(import("@/components/icons/PrizeIcon.vue"))
      )
  ),
  ads: defineAsyncComponent(
    () =>
      new Promise((resolve) =>
        resolve(import("@/components/icons/monitoring/AdsOneIcon.vue"))
      )
  ),
  referral: defineAsyncComponent(
    () =>
      new Promise((resolve) =>
        resolve(import("@/components/icons/monitoring/ReferralIcon.vue"))
      )
  ),
  premium: defineAsyncComponent(
    () =>
      new Promise((resolve) =>
        resolve(import("@/components/icons/monitoring/VuexyBoldStarIcon.vue"))
      )
  ),
  shop: defineAsyncComponent(
    () =>
      new Promise((resolve) =>
        resolve(import("@/components/icons/monitoring/OrderCartIcon.vue"))
      )
  ),
  vote: defineAsyncComponent(
    () =>
      new Promise((resolve) =>
        resolve(import("@/components/icons/monitoring/ChecklistIcon.vue"))
      )
  ),
};

const mn = reactive({
  items: [] /* { time:String, result:Array } */,
  loading: false,
  pagination: {
    current: 1,
    previous: 0,
    next: 2,
    perPage: 10,
    totalPage: 0,
    totalItem: 0,
  },
  types: ["level", "ads", "referral", "premium", "shop", "vote"],
});

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

function infiniteScroll() {
  const listElm = document.getElementById("infinite-list");
  listElm.addEventListener("scroll", () => {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      if (mn.pagination.next) {
        loadMore();
      }
    }
  });
}

function loadMore() {
  mn.loading = true;
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      getMonitoringDetails();
    }
    mn.loading = false;
  }, 500);
}

async function getMonitoringDetails(
  { page = 1, limit = 10 } = { page: 1, limit: 10 }
) {
  try {
    startLoading();
    const response = await coinApi.transactionFindAll({
      body: {
        page,
        limit,
      },
    });

    mn.items = sortResultByDate({
      arr: response.data.result,
    });
    mn.pagination = response.data.pagination;
  } catch (e) {
    toastErrorMessage(e);
  } finally {
    finishLoading();
  }
}

onMounted(() => {
  infiniteScroll();
});

getMonitoringDetails();
</script>

<template>
  <div style="color: black">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div id="infinite-list">
        <div
          v-for="item in mn.items"
          :key="item.id"
          class="flex flex-column row-gap-1 mb-1"
        >
          <div>{{ item.time }}</div>
          <div v-for="detail in item.result" :key="detail.id">
            <monitoring-card :detail="detail">
              <template #icon>
                <component :is="iconsList[detail.type]"></component>
              </template>
            </monitoring-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
