<script setup>
import { onMounted, ref } from "vue";
// import { profileApi } from "@/services/profile.service";
// import { localStorageController } from "@/utils/localstorage.util";
// import { ACCEPT_LANGUAGE, USER_DATA } from "@/constants";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { useI18n } from "vue-i18n";
// import { useTelegramStore } from "@/stores/telegram.store";
// import { useTelegram } from "@/composables/telegram.composable";
import CategoryCard from "@/components/home/category-card/CategoryCard.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { infoApi } from "@/services/info.service";
import UserCardHome from "@/components/home/UserCardHome.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
// import { hasOwnProperty } from "@/utils/object.util";
import { useToast } from "vue-toastification";

// const {tUserFullName} = useTelegramStore();
// const {tUserUniqueId} = useTelegram();

const { t } = useI18n();
const toast = useToast();

import { useUserStore } from "@/stores/user.store";
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
    // style: [{gridRow: "1/3"}, {height: "218px"}],
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
  {
    title: t("home_page.news"),
    image: "/img/categories/newspaper.png",
    notification: null,
    routeName: "news",
    style: [{ gridColumn: "1 / 3" }],
  },
]);

// const user = ref({
//   id: "",
//   fullName: "",
//   avatar: null,
// });

// const getMe = async () => {
//   try {
//     const {
//       data: {result},
//     } = await profileApi.fetchMe();
//     user.value.id = result.id || tUserUniqueId;
//     user.value.fullName =
//         result.first_name || result.last_name
//             ? result.first_name + " " + result.last_name
//             : tUserFullName;
//     user.value.avatar = result.upload?.path || "";
//     localStorageController.set(ACCEPT_LANGUAGE, result.language);
//     localStorageController.set(USER_DATA, result);
//     locale.value = result.language || 'uz'
//   } catch (e) {
//     toast.error(e.response?.data?.message ?? e.message);
//   }
// };

async function getDailyInfo() {
  await infoApi.fetchDaily().then(({ data }) => {
    homeMenu.value[0].notification = data.step;
    homeMenu.value[0].notification =
      4 - +homeMenu.value[0].notification || null;
  });
}

async function getPremiumInfo() {
  await infoApi.fetchPremium().then(({ data }) => {
    homeMenu.value[1].notification = data.step;
    homeMenu.value[1].notification =
      4 - +homeMenu.value[1].notification || null;
  });
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

WebAppController.ready();
</script>

<template>
  <div class="home layout-container">
    <app-loader :active="isFetching" />
    <router-link :to="{ name: 'market-basket' }"> go to basket </router-link>
    <user-card-home
      :user-full-name="user.fullName"
      :user-unique-id="user.id"
      :user-avatar="user.avatar"
      class="mb-1"
    />
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
  </div>
</template>
