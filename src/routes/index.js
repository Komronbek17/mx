import { createRouter, createWebHistory } from "vue-router";

import { getToken } from "@/utils/auth.util";
import { isNUNEZ } from "@/utils/inspect.util";

import AppHome from "@/views/AppHome.vue";
import AppPremium from "@/views/premium/AppPremium.vue";
import AppShop from "@/views/shop/AppShop.vue";
import AppPrize from "@/views/prize/AppPrize.vue";
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
import AppVote from "@/views/vote/AppVote.vue";
import AppMonitoring from "@/views/monitoring/views/AppMonitoring.vue";

import { marketRoutes } from "@/routes/market/market.routes";

import { ACCEPT_LANGUAGE, OLTIN_BALIQ_BOT_TKN } from "@/constants";
import { telegramApi } from "@/services/telegram.service";
import { useTelegramStore } from "@/stores/telegram.store";
import { localStorageController } from "@/utils/localstorage.util";
import AppOrders from "@/views/profile/order-history/AppOrders.vue";
import AppActiveOrders from "@/views/profile/order-history/AppActiveOrders.vue";
import AppOrderHistory from "@/views/profile/order-history/AppOrderHistory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...marketRoutes,
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/chat/AppChat.vue"),
    },
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
      name: "referral-view",
      component: AppReferral,
      // children: [
      //   {
      //     path: "/referral-view",
      //     name: "referral-view",
      //     component: AppReferralIndex,
      //   },
      //   {
      //     path: "/referral-bonus",
      //     name: "referral-bonus",
      //     component: AppReferralBonus,
      //   },
      // ],
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
      path: "/my-orders",
      component: AppOrders,
      children: [
        {
          path: "/orders-active",
          name: "orders-active",
          component: AppActiveOrders,
        },
        {
          path: "/orders-history",
          name: "orders-history",
          component: AppOrderHistory,
        },
      ],
    },
    {
      path: "/level",
      name: "level",
      component: AppLevel,
    },
    {
      path: "/level/product/:id", //now product then it will be changed to id
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
      name: "news-show",
      component: _id,
    },
    {
      path: "/vote",
      name: "votes",
      component: AppVote,
    },
    {
      path: "/monitoring",
      name: "monitoring",
      component: AppMonitoring,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (
    to.name === "login" ||
    to.name === "verification" ||
    to.name === "profile-privacy"
  ) {
    return next();
  }

  const hasToken = isNUNEZ(getToken());

  if (!hasToken) {
    try {
      const { tUserId } = useTelegramStore();

      const body = {
        telegram_id: tUserId,
      };

      return await telegramApi
        .authJwt(body)
        .then(({ data }) => {
          if (data && data.user && data.user.jwt) {
            localStorageController.set(OLTIN_BALIQ_BOT_TKN, data.user.jwt);
            localStorageController.set(ACCEPT_LANGUAGE, data.user.language);
            return next("/");
          }
        })
        .catch(() => {
          return next({
            name: "login",
          });
        });
    } catch (e) {
      return next({
        name: "login",
      });
    }
  }
  return next();
});

export default router;
