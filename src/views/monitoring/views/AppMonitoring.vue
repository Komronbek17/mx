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
  total: {
    total_items: 0,
    total_amount: 0,
    debit_total: 0,
    credit_total: 0,
  },
  loading: false,
  pagination: {
    current: 1,
    previous: 0,
    next: 2,
    perPage: 10,
    totalPage: 0,
    totalItem: 0,
  },
});

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

function infiniteScroll() {
  const listElm = document.getElementById("infinite-list");
  listElm.addEventListener("scroll", () => {
    console.log("lll");
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

async function getProfitDetails() {
  try {
    const response = await coinApi.transactionTotal();
    mn.total = response.data.result;
  } catch (e) {
    toastErrorMessage(e);
  }
}

async function getMonitoringDetails(
  { page = 1, limit = 10 } = { page: 1, limit: 10 }
) {
  try {
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
  }
}

async function fetchMonitoringDetails() {
  try {
    startLoading();
    await Promise.allSettled([getProfitDetails(), getMonitoringDetails()]);
  } catch (e) {
    console.error(e);
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

fetchMonitoringDetails();
</script>

<template>
  <div style="color: black; padding: 1rem">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div id="infinite-list">
        <div>
          <div class="flex column-gap-2 mb-1-5">
            <div class="ol-profits-card">
              <div>Поступление</div>
              <div>+{{ mn.total.debit_total }} FitCoin</div>
            </div>
            <div class="ol-profits-card">
              <div>Расходы</div>
              <div>{{ mn.total.total_amount }} FitCoin</div>
            </div>
          </div>
          <div>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-profits-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--gf-p-main-gray);
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
}
</style>
