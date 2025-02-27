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
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
import { dateProperties, monthsNameList } from "@/utils/date.formatter";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import MonitoringCard from "@/views/monitoring/elements/MonitoringCard.vue";
import AppSpinnerLoader from "@/components/elements/loader/AppSpinnerLoader.vue";

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
  ads_award: defineAsyncComponent(
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
  if (!page) {
    return;
  }

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
        dayOfMonth: topItemDay,
        month: topItemMonth,
        year: topItemYear,
      } = dateProperties(topItem.time, "string");

      const indexOfLastItem = result.findLastIndex((r) => {
        const {
          dayOfMonth: day,
          month,
          year,
        } = dateProperties(r.created_at, "string");
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
      const difference = cDay - day;
      switch (difference) {
        case 0: {
          return `${t("monitoring.today")}, ${dayWithMonth}`;
        }
        case 1: {
          return `${t("monitoring.yesterday")}, ${dayWithMonth}`;
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
  <div class="app-monitoring">
    <div id="infinite-list" style="overflow-y: scroll; height: 100vh">
      <app-loader :active="isFetching" />
      <div class="layout-container">
        <div>
          <div>
            <div class="ol-profits-cards mb-1-5">
              <div
                class="ol-profits-card debit"
                @click="filterByIncome"
                :class="{
                  'ol-profits-active-card': debit !== undefined && debit,
                }"
              >
                <div class="ol-profits-card-title">
                  {{ t("monitoring.debit") }}
                </div>
                <div class="ol-profits-card-value">
                  +{{ mn.total.debit_total }} Fit-Coin
                </div>
              </div>
              <div
                class="ol-profits-card credit"
                @click="filterByOutcome"
                :class="{
                  'ol-profits-active-card': debit !== undefined && !debit,
                }"
              >
                <div class="ol-profits-card-title">
                  {{ t("monitoring.credit") }}
                </div>
                <div class="ol-profits-card-value">
                  {{ mn.total.credit_total }} Fit-Coin
                </div>
              </div>
            </div>

            <router-link :to="{ name: 'informers' }" class="profile-button">
              <img src="@/assets/images/fitcoin.svg" alt="" />
              <p>{{ t("profile_page.earn_fitcoin") }}</p>
            </router-link>

            <div>
              <div
                v-for="item in mn.items"
                :key="item.id"
                class="flex flex-column row-gap-1 mb-1"
              >
                <div class="monitoring-date">
                  {{ showMonitoringTime(item.time) }}
                </div>
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
    <div class="flex justify-center align-center app-monitoring-loader">
      <app-spinner-loader
        size="36"
        color="var(--gf-p-loader-color)"
        v-if="mn.fetching"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-monitoring {
  position: relative;
}

.ol-profits-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0;
  margin-bottom: 1rem;
}

.ol-profits-card {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--gf-p-main-gray);
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.ol-profits-card-title {
  @extend .text-14-400;
  color: var(--text-secondary);
}

.ol-profits-card-value {
  @extend .text-14-500;
  color: var(--text-secondary);
}

.debit {
  & .ol-profits-card-value {
    color: var(--gf-p-green);
  }
}
.credit {
  & .ol-profits-card-value {
    @extend .text-14-500;
    color: var(--accent-red);
  }
}

.monitoring-date {
  @extend .text-12-500;
  color: var(--text-secondary);
}

.ol-profits-active-card {
  background: var(--accent-gray) !important;
}

.app-monitoring-loader {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.profile-button {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 12px;
  column-gap: 10px;
  background: var(--gf-blue-gradient-01) !important;
  border-radius: 8px;
  max-height: 48px;
  cursor: pointer;
  margin-bottom: 2rem;

  p {
    @extend .text-16-600;
    text-align: center;
    letter-spacing: -0.4px;
    color: var(--neutral-white) !important;
  }

  &.disabled {
    background: var(--accent-gray) !important;

    p {
      color: var(--text-secondary) !important;
    }
  }
}
</style>
