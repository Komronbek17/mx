<script setup>
import { useI18n } from "vue-i18n";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { informersApi } from "@/services/informers.service";
import { onMounted, ref } from "vue";
import { loadingComposable } from "@/composables/loading.composable";

import AppLoader from "@/components/elements/loader/AppLoader.vue";

let informers = ref([]);
const { t } = useI18n();
const loading = ref(false);

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const pagination = ref({
  current: 1,
  limit: 10,
});
const getInformers = async () => {
  const body = {
    page: pagination.value.current,
    limit: pagination.value.limit,
  };

  const { data } = await informersApi.fetchInformers(body);
  informers.value = data.result;
};

function loadMore() {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      getInformers();
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
    await getInformers();
    checkScrollFunction();
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="informers">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div
        class="informers-item"
        v-for="informer in informers"
        :key="informer.id"
      >
        <div class="informers-item__image">
          <img :src="informer.upload.path" alt="" />
        </div>
        <div class="w-100 flex align-center justify-between">
          <p class="informers-item__text">
            {{ informer.name }}
          </p>
          <span class="informers-item__sum"
            >{{ informer.amount }}
            {{ t("profile_page.informers.coin_amount") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.informers {
  &-item {
    height: 32px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 1rem;
    background: var(--accent-gray);
    border-radius: 8px;

    &__image {
      min-width: 32px;
      height: 32px;
      margin-right: 1rem;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__text {
      @extend .text-16-500;
      width: 60%;
      letter-spacing: -0.32px;
      color: var(--text-main);
    }

    &__sum {
      @extend .text-14-500;
      text-align: right;
      color: #00db72;
    }
  }
}
</style>
