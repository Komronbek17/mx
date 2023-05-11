<script setup>
import {
  computed,
  defineAsyncComponent,
  onMounted,
  reactive,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { coinApi } from "@/services/coin.service";
import { isUndefined } from "@/utils/inspect.util";
import { hasOwnProperty } from "@/utils/object.util";
import { toastErrorMessage } from "@/utils/error.util";
import { sortResultByDate } from "@/utils/sort.util";
import { dateProperties, monthsNameList } from "@/utils/date.formatter";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import MonitoringCard from "@/views/monitoring/elements/MonitoringCard.vue";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";

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
const route = useRoute();
const router = useRouter();

const mn = reactive({
  items: [] /* { time:String, result:Array } */,
  rawItems: [],
  total: {
    total_items: 0,
    total_amount: 0,
    debit_total: 0,
    credit_total: 0,
  },
  fetching: false,
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

const debit = computed(() => {
  if (hasOwnProperty(route.query, "debit")) {
    return typeof route.query.debit === "string"
      ? parseInt(route.query.debit)
      : route.query.debit;
  }

  return undefined;
});

watch(
  () => debit.value,
  async () => {
    try {
      startLoading();
      await getMonitoringDetails();
    } catch (e) {
      toastErrorMessage(e);
    } finally {
      finishLoading();
    }
  }
);

function beginFetching() {
  mn.fetching = true;
}

function finishFetching() {
  mn.fetching = false;
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
  { page = 1, limit = 10, infinite = false } = {
    page: 1,
    limit: 10,
    infinite: false,
  }
) {
  beginFetching();
  let body = {
    page,
    limit,
  };

  if (!isUndefined(debit.value)) {
    body.debit = !!debit.value;
  }

  try {
    const response = await coinApi.transactionFindAll({
      body,
    });

    const result = response.data.result;

    if (infinite) {
      const topItem = mn.items[mn.items.length - 1];

      const {
        day: topItemDay,
        month: topItemMonth,
        year: topItemYear,
      } = dateProperties(topItem.created_at, "string");

      const indexOfLastItem = result.findLastIndex((r) => {
        const { day, month, year } = dateProperties(r.created_at, "string");
        return (
          year === topItemYear && month === topItemMonth && day === topItemDay
        );
      });

      if (indexOfLastItem !== -1) {
        const addingResult = result.slice(0, indexOfLastItem + 1);
        for (let i = 0; i < addingResult.length; i++) {
          mn.items[mn.items.length - 1].result.push(addingResult[i]);
        }

        const newResult = sortResultByDate({
          arr: result.slice(indexOfLastItem + 1),
        });
        for (let i = 0; i < newResult.length; i++) {
          mn.items.push(newResult[i]);
        }
      } else {
        const items = sortResultByDate({
          arr: result,
        });

        for (let i = 0; i < items.length; i++) {
          mn.items.push(items[i]);
        }
      }
    } else {
      mn.items = sortResultByDate({
        arr: response.data.result,
      });
    }

    mn.pagination = response.data.pagination;
  } catch (e) {
    toastErrorMessage(e);
  } finally {
    finishFetching();
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

async function infiniteFetching() {
  if (!mn.fetching) {
    await getMonitoringDetails({
      infinite: true,
      page: mn.pagination.next,
    });
  }
}

function filterByOutcome() {
  let debitQuery = 0;

  if (debit.value === 0) {
    debitQuery = undefined;
  }

  router.push({
    query: {
      debit: debitQuery,
    },
  });
}

function filterByIncome() {
  let debitQuery = 1;

  if (debit.value === 1) {
    debitQuery = undefined;
  }

  router.push({
    query: {
      debit: debitQuery,
    },
  });
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
  const { mountInfiniteScroll } = useInfiniteScroll({
    fn: infiniteFetching,
    el: "infinite-list",
  });

  mountInfiniteScroll({});
});

fetchMonitoringDetails();
</script>

<template>
  <div
    id="infinite-list"
    style="color: black; overflow-y: scroll; height: 95vh"
  >
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div>
        <div>
          <div class="flex column-gap-1 mb-1-5">
            <div
              class="ol-profits-card"
              @click="filterByIncome"
              :class="{
                'ol-profits-active-card': debit !== undefined && debit,
              }"
            >
              <div>Поступление</div>
              <div>+{{ mn.total.debit_total }} FitCoin</div>
            </div>
            <div
              class="ol-profits-card"
              @click="filterByOutcome"
              :class="{
                'ol-profits-active-card': debit !== undefined && !debit,
              }"
            >
              <div>Расходы</div>
              <div>{{ mn.total.credit_total }} FitCoin</div>
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
  white-space: nowrap;
}

.ol-profits-active-card {
  background-color: var(--gf-p-main-gray);
}
</style>
