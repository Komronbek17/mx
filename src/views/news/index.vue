<script setup>
import { newsApi } from "@/services/news.service";
import { onMounted, ref } from "vue";

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
    console.log(data, "newsApi");
  } catch (e) {
    console.log(e, "newsApi");
  }
};

function loadMore() {
  /** This is only for this demo, you could
   * replace the following with code to hit
   * an endpoint to pull in more data. **/
  loading.value = true;
  setTimeout((e) => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      getNews();
    }
    loading.value = false;
  }, 2000);
  /**************************************/

    /** This is only for this demo, you could
     * replace the following with code to hit
     * an endpoint to pull in more data. **/
    loading.value = true;
    setTimeout(e => {
        for (let i = 0; i < 1; i++) {
            pagination.value.current++
            getNews()
        }
        loading.value = false;
    }, 1000);

}

onMounted(() => {
  getNews();

    const listElm = document.getElementById('infinite-list');
    listElm.addEventListener('scroll', (e) => {
        console.log(e, 'e');
        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
            loadMore();
        }
    });
    // Initially load some items.
    loadMore();
})
</script>

<template>
  <div id="infinite-list" class="news">
    <div class="layout-container">
      <!--   NEWS TOP ADS   -->
      <!--            <div class="news-ads flex align-center justify-between">-->
      <!--                <div>-->
      <!--                    <p>Акция! Успейте забрать ценные призы</p>-->
      <!--                    <span>до 31.12.2022</span>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                    <img src="@/assets/images/news-ads-img.png" alt=""/>-->
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
          <img :src="item.img" alt="" />
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
  &-ads {
    background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
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
      border-bottom: 1px solid #f5f5f5;
      text-decoration: none;

      &:last-child {
        border-bottom: none;
      }

      img {
        width: 66px;
        height: 66px;
        object-fit: contain;
        padding-right: 1rem;
      }

      p {
        font-weight: 600;
        font-size: 15px;
        line-height: 133%;
        color: #333333;
        margin: 0 0 8px 0;
      }

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 129%;
        color: #a3abb8;
      }
    }
  }
}
</style>
