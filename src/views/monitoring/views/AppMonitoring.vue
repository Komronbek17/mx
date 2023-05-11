<script setup>
import { defineAsyncComponent, onMounted, reactive } from "vue";
import { coinApi } from "@/services/coin.service";
import { toastErrorMessage } from "@/utils/error.util";
import { sortResultByDate } from "@/utils/sort.util";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import MonitoringCard from "@/views/monitoring/elements/MonitoringCard.vue";
import { useI18n } from "vue-i18n";
import { dateProperties, monthsNameList } from "@/utils/date.formatter";

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
const { t } = useI18n();
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

function showMonitoringTime(time) {
  const { year, month, dayOfMonth: day } = dateProperties(time, "string");
  const {
    year: cYear,
    month: cMonth,
    dayOfMonth: cDay,
  } = dateProperties(new Date());

  const monthName = monthsNameList[month];
  const monthI18n = t(`months.${monthName}`);
  const dayWithMonth = `${day} ${monthI18n}`;

  if (year === cYear) {
    if (month === cMonth) {
      const difference = day - cDay;
      switch (difference) {
        case 0: {
          return `Сегодня, ${dayWithMonth}`;
        }
        case 1: {
          return `Вчера, ${dayWithMonth}`;
        }
      }
    }

    return dayWithMonth;
  }

  return `${day} ${monthI18n}, ${year}`;
}

onMounted(() => {
  infiniteScroll();
});

getMonitoringDetails();
</script>

<template>
  <div style="color: black">
    <app-loader :active="isFetching" />
    <div>
      <div id="infinite-list">
        <div
          v-for="item in mn.items"
          :key="item.id"
          class="flex flex-column row-gap-1 mb-1"
        >
          <div>{{ showMonitoringTime(item.time) }}</div>
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
