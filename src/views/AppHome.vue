<script setup>
import { onMounted, ref } from "vue";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { useI18n } from "vue-i18n";
import CategoryCard from "@/components/home/category-card/CategoryCard.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { infoApi } from "@/services/info.service";
import UserCardHome from "@/components/home/UserCardHome.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { useToast } from "vue-toastification";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();

import { useUserStore } from "@/stores/user.store";
import { voteApi } from "@/services/vote.service";
import VoteStartModal from "@/views/vote/VoteStartModal.vue";
import { useRouter } from "vue-router";
import {
  getSessionStorageVariable,
  setSessionStorageVariable,
} from "@/utils/localstorage.util";
import { TELEGRAM, WEB_APP } from "@/constants";

const { user, initUser } = useUserStore();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const homeMenu = ref([
  {
    title: t("home_page.daily"),
    image: "/img/categories/catch-fish.png",
    notification: null,
    routeName: "daily",
    style: [{ gridRow: "1/3" }, { height: "218px" }],
  },
  {
    title: t("home_page.premium"),
    image: "/img/categories/premium.png",
    notification: null,
    routeName: "premium",
    style: [{ gridRow: "1/3" }, { height: "218px" }],
  },
  {
    title: t("home_page.market"),
    image: "/img/categories/market.png",
    notification: null,
    routeName: "market",
    style: [{ gridColumn: "1 / 3" }],
  },
  {
    title: t("home_page.bonuses"),
    image: "/img/categories/bonuses.png",
    routeName: "bonus-recent",
    // style: [
    //   {gridRow: '3/5'},
    //   {height: '218px'}
    // ]
  },
  {
    title: t("home_page.prizes"),
    image: "/img/categories/prizes.png",
    notification: null,
    routeName: "level",
    style: {},
  },
  {
    title: t("home_page.monitoring"),
    image: "/img/categories/monitoring.png",
    notification: null,
    routeName: "monitoring",
    // style: [{ gridColumn: "1 / 3" }],
  },
  {
    title: t("home_page.news"),
    image: "/img/categories/newspaper.png",
    notification: null,
    routeName: "news",
    // style: [{ gridColumn: "1 / 3" }],
  },
  {
    title: t("home_page.profile"),
    image: "/img/categories/profile.png",
    routeName: "profile",
    // style: [
    //   {gridRow: '3/5'},
    //   {height: '218px'}
    // ]
  },
  {
    title: t("home_page.settings"),
    image: "/img/categories/settings.png",
    routeName: "settings",
    style: {},
  },
]);

async function getDailyInfo() {
  try {
    await infoApi.fetchDaily().then(({ data }) => {
      homeMenu.value[0].notification = data.step;
      homeMenu.value[0].notification =
        4 - +homeMenu.value[0].notification || null;
    });
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  }
}

async function getPremiumInfo() {
  await infoApi.fetchPremium().then(({ data }) => {
    homeMenu.value[1].notification = data.step;
    homeMenu.value[1].notification =
      4 - +homeMenu.value[1].notification || null;
  });
}

const voteExists = ref(false);

async function checkVoteExists() {
  try {
    const { data } = await voteApi.checkExists();
    voteExists.value =
      data?.question_exists && !getSessionStorageVariable("vote_approved");
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  }
}

function redirectVotePage() {
  router.push({ name: "votes" });
}

function cancelVote() {
  setSessionStorageVariable("vote_approved", true);
  voteExists.value = false;
}

console.log(window[TELEGRAM]);
function openLink() {
  // window[TELEGRAM][WEB_APP].HapticFeedback.impactOccurred("heavy");
  // window[TELEGRAM][WEB_APP].HapticFeedback.impactOccurred("rigid");

  // setInterval(() => {
  // }, 100);
  window[TELEGRAM][WEB_APP].HapticFeedback.notificationOccurred("error");
  // window[TELEGRAM][WEB_APP].HapticFeedback.impactOccurred("soft");
  // window[TELEGRAM][WEB_APP].HapticFeedback.impactOccurred("light");
  // window[TELEGRAM][WEB_APP].HapticFeedback.impactOccurred("medium");
  // Get the text field

  // Copy the text inside the text field
  navigator.clipboard.writeText("sultonov_komron");

  // Alert the copied text
}

onMounted(async () => {
  try {
    startLoading();
    if (!(user && user.id)) {
      await initUser();
    }
    await getPremiumInfo();
    await getDailyInfo();
  } finally {
    finishLoading();
  }
});

checkVoteExists();

WebAppController.ready();
</script>

<template>
  <div class="home layout-container">
    <app-loader :active="isFetching" />
    <user-card-home
      :user-full-name="user.fullName"
      :user-unique-id="user.id"
      :user-avatar="user.avatar"
      class="mb-1"
    />
    <div @click="openLink" class="p-1 m-2">link</div>
    <div class="home__menu grid-menu">
      <category-card
        v-for="(item, index) in homeMenu"
        :key="index"
        :to="{ name: item.routeName }"
        :title="item.title"
        :image="item.image"
        :notification="item.notification"
        :style="item.style"
      />
    </div>

    <vote-start-modal
      v-if="voteExists"
      :active="voteExists"
      @start-vote="redirectVotePage"
      @close-modal="cancelVote"
    />
  </div>
</template>
