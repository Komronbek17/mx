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
import AppProfile from "@/views/settings/AppProfile.vue";
import AppNews from "@/views/news/index.vue"
import _id from "@/views/news/_id.vue";

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
      path: "/profile",
      name: "profile",
      component: AppProfile,
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
      path: '/news/:id',
      name: 'one-news',
      component: _id
    }
  ],
});

export default router;
