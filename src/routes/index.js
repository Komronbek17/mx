import { createRouter, createWebHistory } from "vue-router";

import { getToken } from "@/utils/auth.util";
import { isNUNEZ } from "@/utils/inspect.util";

import AppHome from "@/views/home/AppHome.vue";
import AppPremium from "@/views/premium/AppPremium.vue";
import AppShop from "@/views/shop/AppShop.vue";
import AppPrize from "@/views/prize/AppPrize.vue";
import AppMarket from "@/views/market/AppMarket.vue";
import AppSettings from "@/views/settings/AppSettings.vue";
import AppLanguage from "@/views/settings/AppLanguage.vue";
import AppGame from "@/views/game/AppGame.vue";
import AppNews from "@/views/news/index.vue";
import AppProfile from "@/views/profile/AppProfile.vue";
import AppNotification from "@/views/profile/AppNotification.vue";
import AppProfileEdit from "@/views/profile/AppProfileEdit.vue";
import AppInformers from "@/views/profile/AppInformers.vue";
import AppDaily from "@/views/daily/AppDaily.vue";
import _id from "@/views/news/_id.vue";
import AppReferral from "@/views/profile/AppReferral.vue";
import AppReferralBonus from "@/views/profile/AppReferralBonus.vue";
import AppReferralIndex from "@/views/profile/AppReferralIndex.vue";
import AppSoundController from "@/views/settings/AppSoundController.vue";
import AppUnsubscribe from "@/views/settings/AppUnsubscribe.vue";
import AppPrivacyPolicy from "@/views/profile/AppPrivacyPolicy.vue";
import AppBonus from "@/views/bonus/AppBonus.vue";
import AppBonusActive from "@/views/bonus/AppBonusActive.vue";
import AppBonusRecent from "@/views/bonus/AppBonusRecent.vue";
import AppBonusPrize from "@/views/bonus/AppBonusPrize.vue";
import AppLevel from "@/views/level/AppLevel.vue";
import AppLevelProduct from "@/views/level/level-product/AppLevelProduct.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: AppLogin,
    // },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/AppSignIn.vue"),
    },
    {
      path: "/verification",
      name: "verification",
      component: () => import("@/views/login/AppVerifyCode.vue"),
    },
    {
      path: "/premium",
      name: "premium",
      component: AppPremium,
    },
    {
      path: "/daily",
      name: "daily",
      component: AppDaily,
    },
    {
      path: "/prize",
      name: "prize",
      component: AppPrize,
    },
    {
      path: "/settings",
      name: "settings",
      component: AppSettings,
    },
    {
      path: "/settings/language",
      name: "settings-language",
      component: AppLanguage,
    },
    {
      path: "/settings/sound",
      name: "settings-sound",
      component: AppSoundController,
    },
    {
      path: "/settings/unsubscribe",
      name: "settings-unsubscribe",
      component: AppUnsubscribe,
    },
    {
      path: "/profile/privacy-policy",
      name: "profile-privacy",
      component: AppPrivacyPolicy,
    },
    {
      path: "/profile",
      name: "profile",
      component: AppProfile,
    },
    {
      path: "/profile/notification",
      name: "notification",
      component: AppNotification,
    },
    {
      path: "/profile/informers",
      name: "informers",
      component: AppInformers,
    },
    {
      path: "/profile/edit",
      name: "profile-edit",
      component: AppProfileEdit,
    },
    {
      path: "/referral",
      component: AppReferral,
      children: [
        {
          path: "/referral-view",
          name: "referral-view",
          component: AppReferralIndex,
        },
        {
          path: "/referral-bonus",
          name: "referral-bonus",
          component: AppReferralBonus,
        },
      ],
    },
    {
      path: "/bonus",
      component: AppBonus,
      children: [
        {
          path: "/bonus-active",
          name: "bonus-active",
          component: AppBonusActive,
        },
        {
          path: "/bonus-recent",
          name: "bonus-recent",
          component: AppBonusRecent,
        },
        {
          path: "/bonus-prize",
          name: "bonus-prize",
          component: AppBonusPrize,
        },
        // {
        //   path: "/bonus-archive",
        //   name: "bonus-archive",
        //   component: AppBonusArchive,
        // },
      ],
    },
    {
      path: "/market",
      name: "market",
      component: AppMarket,
    },
    {
      path: "/level",
      name: "level",
      component: AppLevel,
    },
    {
      path: "/level/product", //now product then it will be changed to id
      name: "level-product",
      component: AppLevelProduct,
    },
    {
      path: "/game",
      name: "game",
      component: AppGame,
    },
    {
      path: "/shop",
      name: "shop",
      component: AppShop,
    },
    {
      path: "/news",
      name: "news",
      component: AppNews,
    },
    {
      path: "/news/:id",
      name: "one-news",
      component: _id,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "login" || to.name === "verification") {
    return next();
  }

  const hasToken = isNUNEZ(getToken());
  if (!hasToken) {
    return next({
      name: "login",
    });
  }

  return next();
});

export default router;
