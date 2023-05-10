<script setup>
import { onMounted, reactive } from "vue";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { toastErrorMessage } from "@/utils/error.util";
import { sortResultByDate } from "@/utils/sort.util";

const mn = reactive({
  items: [],
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
  <div>
    <app-loader :active="isFetching" />
    <div>
      <div id="infinite-list">
        <div v-for="item in mn.items" :key="item.id">
          <span>
            <span>{{ item.title }}</span>
            <span>{{ item["sub_title"] }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
