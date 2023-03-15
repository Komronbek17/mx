<script setup>
import { onMounted, ref } from "vue";
import { newsApi } from "@/services/news.service";
import { loadingComposable } from "@/composables/loading.composable";

import AppLoader from "@/components/elements/loader/AppLoader.vue";

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const news = ref([]);

const pagination = ref({
  current: 1,
  limit: 10,
});
const loading = ref(false);
const getNews = async () => {
  const body = {
    method: "news.get_all",
    params: {
      page: pagination.value.current,
      limit: pagination.value.limit,
    },
  };
  try {
    const { data } = await newsApi.fetchNews(body);
    news.value = [...news.value, ...data.result];
    pagination.value = Object.assign(pagination.value, data.pagination);
    console.log(news);
  } catch (e) {
    console.log(e, "newsApi");
  }
};

function loadMore() {
  loading.value = true;
  setTimeout((e) => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      getNews();
    }
    loading.value = false;
  }, 500);
}

onMounted(async () => {
  startLoading();
  try {
    await getNews();
  } finally {
    finishLoading();
  }

  const listElm = document.getElementById("infinite-list");
  listElm.addEventListener("scroll", (e) => {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      loadMore();
    }
  });
  // Initially load some items.
  loadMore();
});
</script>

<template>
  <div id="infinite-list" class="news">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <!--   NEWS TOP ADS   -->
      <!--            <div class="news-ads flex align-center justify-between">-->
      <!--                <div>-->
      <!--                    <p>Акция! Успейте забрать ценные призы</p>-->
      <!--                    <span>до 31.12.2022</span>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                    <img src="@/assets/images/news-ads-prize.png" alt=""/>-->
      <!--                </div>-->
      <!--            </div>-->

      <!--   NEW LIST   -->
      <div class="news-list flex flex-column flex-wrap">
        <router-link
          v-for="item in news"
          :key="item.id"
          :to="{ name: 'news-show', params: { id: item.id } }"
          class="news-list__item flex align-center"
        >
          <div class="news-list__item-img">
            <img v-if="item.image" :src="item.image.path" alt="" />
            <img v-else src="@/assets/images/no-photo.png" alt="" />
          </div>
          <div>
            <p>{{ item.name }}</p>
            <span>{{ item.date }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news {
  padding: 0;

  &-ads {
    background: var(--gf-blue-gradient-02);
    border-radius: 8px;
    padding: 12px 1rem;
    margin-bottom: 19px;

    p {
      font-weight: 600;
      font-size: 17px;
      line-height: 129%;
      margin: 0 0 5px 0;
    }

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 129%;
    }

    img {
      height: auto;
      object-fit: contain;
    }
  }

  &-list {
    &__item {
      padding: 12px 0;
      border-bottom: 1px solid var(--gf-disable-btn);
      text-decoration: none;

      &:last-child {
        border-bottom: none;
      }

      &-img {
        width: 66px;
        height: 66px;
        padding-right: 1rem;

        img {
          height: 100%;
          min-width: 66px;
          max-width: 66px;
          object-fit: contain;
        }
      }

      p {
        font-weight: 600;
        font-size: 15px;
        line-height: 133%;
        color: var(--gf-text-33);
        margin: 0 0 8px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 129%;
        color: var(--gf-text-secondary-gray);
      }
    }
  }
}
</style>
