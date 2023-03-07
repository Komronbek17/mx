<script setup>
import { newsApi } from "@/services/news.service";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { WebAppController } from "@/utils/telegram/web.app.util";

const route = useRoute();
const newData = ref({});
const svgColor = WebAppController.isDarkMode() ? "#FFFFFF" : "#333333";

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const toast = useToast();

const body = {
  method: "news.get_one",
  params: {
    id: route.params.id,
  },
};

const getNewData = async () => {
  startLoading();
  try {
    const { data } = await newsApi.fetchOneNews(body);
    newData.value = data.result;
    console.log(data, "newsApi");
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
    finishLoading();
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

WebAppController.ready();
</script>

<template>
  <div class="one-news">
    <app-loader :active="isFetching" />
    <img :src="newData.image" alt="" />
    <div class="layout-container">
      <span class="one-news__date">{{ newData.date }}</span>

      <p class="one-news__title">{{ newData.name }}</p>

      <div class="one-news__description">
        {{ newData.description }}
      </div>

      <div v-if="newData.likes" class="one-news__btns flex align-center">
        <button @click="onLike" class="flex align-center">
          <svg
            v-if="newData.is_like"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.59326 12.3266V5.55328C5.59326 5.28661 5.67326 5.02661 5.81993 4.80661L7.63993 2.09994C7.92659 1.66661 8.63993 1.35994 9.24659 1.58661C9.89993 1.80661 10.3333 2.53994 10.1933 3.19328L9.84659 5.37328C9.81993 5.57328 9.87326 5.75328 9.98659 5.89328C10.0999 6.01994 10.2666 6.09994 10.4466 6.09994H13.1866C13.7133 6.09994 14.1666 6.31328 14.4333 6.68661C14.6866 7.04661 14.7333 7.51328 14.5666 7.98661L12.9266 12.9799C12.7199 13.8066 11.8199 14.4799 10.9266 14.4799H8.32659C7.87993 14.4799 7.25326 14.3266 6.96659 14.0399L6.11326 13.3799C5.78659 13.1333 5.59326 12.7399 5.59326 12.3266Z"
              :fill="svgColor"
            />
            <path
              d="M3.4735 4.2533H2.78683C1.7535 4.2533 1.3335 4.6533 1.3335 5.63996V12.3466C1.3335 13.3333 1.7535 13.7333 2.78683 13.7333H3.4735C4.50683 13.7333 4.92683 13.3333 4.92683 12.3466V5.63996C4.92683 4.6533 4.50683 4.2533 3.4735 4.2533Z"
              :fill="svgColor"
            />
          </svg>

          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8532 14.7333H8.31991C7.94658 14.7333 7.13324 14.62 6.69991 14.1866L4.67991 12.6266L5.29324 11.8333L7.35991 13.4333C7.52658 13.5933 7.94658 13.7266 8.31991 13.7266H10.8532C11.4532 13.7266 12.0999 13.2466 12.2332 12.7066L13.8466 7.80662C13.9532 7.51329 13.9332 7.24662 13.7932 7.05329C13.6466 6.84662 13.3799 6.72662 13.0532 6.72662H10.3866C10.0399 6.72662 9.71991 6.57995 9.49991 6.32662C9.27324 6.06662 9.17324 5.71995 9.22658 5.35995L9.55991 3.21995C9.63991 2.84662 9.38658 2.42662 9.02658 2.30662C8.69991 2.18662 8.27991 2.35995 8.13324 2.57329L5.39991 6.63995L4.57324 6.08662L7.30658 2.01995C7.72658 1.39329 8.64658 1.09329 9.36658 1.36662C10.1999 1.63995 10.7332 2.55995 10.5466 3.41329L10.2199 5.51329C10.2132 5.55995 10.2132 5.62662 10.2599 5.67995C10.2932 5.71329 10.3399 5.73329 10.3932 5.73329H13.0599C13.7132 5.73329 14.2799 6.00662 14.6132 6.47995C14.9399 6.93995 15.0066 7.54662 14.7932 8.13329L13.1999 12.9866C12.9532 13.9533 11.9266 14.7333 10.8532 14.7333Z"
              :fill="svgColor"
            />
            <path
              d="M3.58643 14H2.91976C1.68643 14 1.08643 13.42 1.08643 12.2333V5.70002C1.08643 4.51335 1.68643 3.93335 2.91976 3.93335H3.58643C4.81976 3.93335 5.41976 4.51335 5.41976 5.70002V12.2333C5.41976 13.42 4.81976 14 3.58643 14ZM2.91976 4.93335C2.19309 4.93335 2.08643 5.10668 2.08643 5.70002V12.2333C2.08643 12.8267 2.19309 13 2.91976 13H3.58643C4.31309 13 4.41976 12.8267 4.41976 12.2333V5.70002C4.41976 5.10668 4.31309 4.93335 3.58643 4.93335H2.91976Z"
              :fill="svgColor"
            />
          </svg>

          <span> {{ newData.likes.like }}</span>
        </button>
        <button @click="onDislike" class="flex align-center">
          <svg
            v-if="newData.is_dislike"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4068 3.66664V10.44C10.4068 10.7066 10.3268 10.9666 10.1802 11.1866L8.36017 13.8933C8.07351 14.3266 7.36017 14.6333 6.75351 14.4066C6.10017 14.1866 5.66684 13.4533 5.80684 12.8L6.15351 10.62C6.18017 10.42 6.12684 10.24 6.01351 10.1C5.90017 9.9733 5.73351 9.8933 5.55351 9.8933H2.81351C2.28684 9.8933 1.83351 9.67997 1.56684 9.30664C1.31351 8.94664 1.26684 8.47997 1.43351 8.00664L3.07351 3.01331C3.28017 2.18664 4.18017 1.51331 5.07351 1.51331H7.67351C8.12017 1.51331 8.74684 1.66664 9.03351 1.95331L9.88684 2.61331C10.2135 2.86664 10.4068 3.25331 10.4068 3.66664Z"
              :fill="svgColor"
            />
            <path
              d="M12.5266 11.7401H13.2132C14.2466 11.7401 14.6666 11.3401 14.6666 10.3534V3.65339C14.6666 2.66672 14.2466 2.26672 13.2132 2.26672H12.5266C11.4932 2.26672 11.0732 2.66672 11.0732 3.65339V10.3601C11.0732 11.3401 11.4932 11.7401 12.5266 11.7401Z"
              :fill="svgColor"
            />
          </svg>
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.19986 14.7334C7.00653 14.7334 6.8132 14.7001 6.6332 14.6334C5.79986 14.3601 5.26653 13.4401 5.4532 12.5867L5.77986 10.4867C5.78653 10.4401 5.78653 10.3734 5.73986 10.3201C5.70653 10.2867 5.65986 10.2667 5.60653 10.2667H2.93986C2.28653 10.2667 1.71986 9.99339 1.38653 9.52006C1.05986 9.06006 0.993196 8.45339 1.20653 7.86672L2.79986 3.01339C3.04653 2.04672 4.07986 1.26672 5.14653 1.26672H7.67986C8.0532 1.26672 8.86653 1.38006 9.29986 1.81339L11.3199 3.37339L10.7065 4.16672L8.63986 2.56672C8.4732 2.40006 8.0532 2.26672 7.67986 2.26672H5.14653C4.54653 2.26672 3.89986 2.74672 3.76653 3.28672L2.1532 8.18672C2.04653 8.48006 2.06653 8.74672 2.20653 8.94006C2.3532 9.14672 2.61986 9.26672 2.94653 9.26672H5.6132C5.95986 9.26672 6.27986 9.41339 6.49986 9.66672C6.72653 9.92672 6.82653 10.2734 6.7732 10.6334L6.43986 12.7734C6.35986 13.1467 6.6132 13.5667 6.9732 13.6867C7.2932 13.8067 7.71986 13.6334 7.86653 13.4201L10.5999 9.35339L11.4265 9.91339L8.6932 13.9801C8.37986 14.4467 7.78653 14.7334 7.19986 14.7334Z"
              :fill="svgColor"
            />
            <path
              d="M13.0801 12.0667H12.4134C11.1801 12.0667 10.5801 11.4867 10.5801 10.3V3.76667C10.5801 2.58 11.1801 2 12.4134 2H13.0801C14.3134 2 14.9134 2.58 14.9134 3.76667V10.3C14.9134 11.4867 14.3134 12.0667 13.0801 12.0667ZM12.4134 3C11.6867 3 11.5801 3.17333 11.5801 3.76667V10.3C11.5801 10.8933 11.6867 11.0667 12.4134 11.0667H13.0801C13.8067 11.0667 13.9134 10.8933 13.9134 10.3V3.76667C13.9134 3.17333 13.8067 3 13.0801 3H12.4134Z"
              :fill="svgColor"
            />
          </svg>
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
    color: var(--gf-text-secondary-gray-2x);
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 133%;
    letter-spacing: -0.5px;
    color: var(--gf-text-33);
    margin: 1rem 0;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 138%;
    letter-spacing: -0.5px;
    color: var(--gf-text-33);
  }

  &__btns {
    margin-top: 24px;

    & button {
      padding: 10px;
      border-radius: 8px;
      border: none;
      margin-right: 1rem;
      background: var(--gf-hover-bg);

      &:last-child {
        margin-right: 0;
      }

      & svg {
        width: 1rem;
        height: 1rem;
        object-fit: contain;
        margin-right: 4px;
      }

      & span {
        font-weight: 500;
        font-size: 14px;
        line-height: 114%;
        color: var(--gf-text-33);
      }
    }
  }
}
</style>
