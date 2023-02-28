import { createRouter, createWebHistory } from "vue-router";

import AppHome from "@/views/home/AppHome.vue";
import AppPremium from "@/views/premium/AppPremium.vue";
import AppShop from "@/views/shop/AppShop.vue";
import AppLogin from "@/views/login/AppLogin.vue";
import AppPrize from "@/views/prize/AppPrize.vue";
import AppMarket from "@/views/market/AppMarket.vue";
import AppSettings from "@/views/settings/AppSettings.vue";
import AppLanguage from "@/views/settings/AppLanguage.vue";
import AppBonus from "@/views/bonus/AppBonus.vue";
import AppGame from "@/views/game/AppGame.vue";
import AppNews from "@/views/news/index.vue";
import AppProfile from "@/views/profile/index.vue";
import AppNotification from "@/views/profile/AppNotification.vue";
import AppProfileEdit from "@/views/profile/AppProfileEdit.vue";
import AppInformers from "@/views/profile/AppInformers.vue";
import AppDaily from "@/views/daily/AppDaily.vue";
import _id from "@/views/news/_id.vue";
import { getToken } from "@/utils/auth.util";
import { isNUNEZ } from "@/utils/inspect.util";
import AppReferral from "@/views/profile/AppReferral.vue";
import AppReferralBonus from "@/views/profile/AppReferralBonus.vue";
import AppReferralIndex from "@/views/profile/AppReferralIndex.vue";
import AppSoundController from "@/views/settings/AppSoundController.vue";
import AppUnsubscribe from "@/views/settings/AppUnsubscribe.vue";
import AppPrivacyPolicy from "@/views/settings/AppPrivacyPolicy.vue";
import AppBonusHistory from "@/views/bonus-history/AppBonusHistory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/login",
      name: "login",
      component: AppLogin,
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
      path: "/settings/privacy-policy",
      name: "settings-privacy",
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
      // name: "referral",
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
      path: "/market",
      name: "market",
      component: AppMarket,
    },
    {
      path: "/bonus",
      name: "bonus",
      component: AppBonus,
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
    {
      path: "/bonus-history",
      name: "bonus-history",
      component: AppBonusHistory,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
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
