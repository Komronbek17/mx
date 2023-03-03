<script setup>
import { newsApi } from "@/services/news.service";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const newData = ref({});

const toast = useToast();

const body = {
  method: "news.get_one",
  params: {
    id: route.params.id,
  },
};

const getNewData = async () => {
  try {
    const { data } = await newsApi.fetchOneNews(body);
    newData.value = data.result;
    console.log(data, "newsApi");
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

const onLike = async () => {
  try {
    const { data } = await newsApi.setLike(body);
    newData.value = data.result;
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

const onDislike = async () => {
  try {
    const { data } = await newsApi.setDislike(body);
    newData.value = data.result;
  } catch ({ response }) {
    toast.error(response?.data?.message);
  }
};

onMounted(() => {
  getNewData();
});
</script>

<template>
  <div class="one-news">
    <img :src="newData.image" alt="" />
    <div class="layout-container">
      <span class="one-news__date">{{ newData.date }}</span>

      <p class="one-news__title">{{ newData.name }}</p>

      <div class="one-news__description">
        {{ newData.description }}
      </div>

      <div v-if="newData.likes" class="one-news__btns flex align-center">
        <button @click="onLike" class="flex align-center">
          <img
            v-if="newData.is_like"
            src="@/assets/images/like-fill.svg"
            alt=""
          />
          <img v-else src="@/assets/images/like.svg" alt="" />
          <span> {{ newData.likes.like }}</span>
        </button>
        <button @click="onDislike" class="flex align-center">
          <img
            v-if="newData.is_dislike"
            src="@/assets/images/dislike-fill.svg"
            alt=""
          />
          <img v-else src="@/assets/images/dislike.svg" alt="" />
          <span>{{ newData.likes.dislike }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.one-news {
  & img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__date {
    font-weight: 400;
    font-size: 14px;
    line-height: 133%;
    color: #a3abb8;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 133%;
    letter-spacing: -0.5px;
    color: #333333;
    margin: 1rem 0;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 138%;
    letter-spacing: -0.5px;
    color: #333333;
  }

  &__btns {
    margin-top: 24px;

    & button {
      padding: 10px;
      border-radius: 8px;
      border: none;
      margin-right: 1rem;
      background: #f5f5f5;

      &:last-child {
        margin-right: 0;
      }

      & img {
        width: 1rem;
        height: 1rem;
        object-fit: contain;
        margin-right: 4px;
      }

      & span {
        font-weight: 500;
        font-size: 14px;
        line-height: 114%;
        color: #333333;
      }
    }
  }
}
</style>
