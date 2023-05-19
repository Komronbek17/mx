<script setup>
import { useI18n } from "vue-i18n";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { informersApi } from "@/services/informers.service";
import { onMounted, ref } from "vue";
import { loadingComposable } from "@/composables/loading.composable";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { voteApi } from "@/services/vote.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();
let informers = ref([]);
let vote = ref(0);
const { t } = useI18n();
const toast = useToast();
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
  informers.value = [...data.result, ...informers.value];
  if (!vote.value) {
    vote.value = informers.value.reduce((acc, v) => {
      if (v["type"] === "vote") {
        return acc + v["amount"];
      }
      return acc;
    }, 0);
  }
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

const voteExists = ref(false);

async function checkVoteExists() {
  try {
    const { data } = await voteApi.checkExists();
    voteExists.value = data?.question_exists;
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message);
  }
}

const redirectVotes = () => {
  if (voteExists.value) {
    router.push({ name: "votes" });
  } else {
    toast.error(t("vote_page.votes_empty"));
  }
};

const redirectReferral = () => {
  router.push({ name: "referral-view" });
};

onMounted(async () => {
  startLoading();
  try {
    await getInformers();
    await checkVoteExists();
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
      <div @click="redirectVotes" class="votes">
        <img src="@/assets/images/survey-icon.svg" alt="" />
        <div class="votes-block">
          <div class="votes-block_details">
            <p>{{ t("votes") }}</p>
            <span>{{
              t("votes_description", {
                value: vote,
              })
            }}</span>
          </div>
          <div class="votes-block_btn">
            <img src="@/assets/images/arrow-right-votes.svg" alt="" />
          </div>
        </div>
      </div>

      <div @click="redirectReferral" class="votes">
        <img src="@/assets/images/referral-icon-1.svg" alt="" />
        <div class="votes-block">
          <div class="votes-block_details">
            <p class="votes-block_details-title">
              {{ t("profile_page.referral_title") }}
            </p>
            <span class="votes-block_details-description">{{
              t("profile_page.referral_description")
            }}</span>
          </div>
          <div class="votes-block_btn">
            <img src="@/assets/images/arrow-right-votes.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="informers-header">
        <p>{{ t("action") }}</p>
        <p>{{ t("award") }}</p>
      </div>
      <div
        id="infinite-list"
        class="informers-item"
        v-for="informer in informers"
        :key="informer.id"
      >
        <div class="informers-item__image">
          <img :src="informer.upload.path" alt="" />
        </div>
        <div class="border-bottom w-100 flex align-center justify-between">
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
.votes {
  border: 1px solid var(--accent-gray);
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & img {
    margin-right: 12px;
  }

  &-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & p {
      @extend .text-16-500;
      color: var(--text-main);
    }

    & span {
      display: block;
      width: 80%;
      @extend .text-14-400;
      color: var(--text-secondary);
    }

    &_btn {
      width: 32px;
      height: 32px;
      min-width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--accent-gray);
      border-radius: 100%;

      & img {
        margin: 0;
      }
    }
  }
}

.informers {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--accent-gray);

    & p {
      @extend .text-14-400;
      color: var(--text-main);
    }
  }

  &-item {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 1rem 0;
    //background: var(--accent-gray);
    border-radius: 8px;

    &:last-child .border-bottom {
      border-bottom: 1px solid transparent;
    }

    &__image {
      min-width: 44px;
      height: 44px;
      margin-right: 1rem;
      background-color: var(--accent-gray);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      & img {
        width: 24px;
        height: 24px;
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

.border-bottom {
  height: 100%;
  border-bottom: 1px solid var(--accent-gray);
  padding: 1rem 0;
}
</style>
