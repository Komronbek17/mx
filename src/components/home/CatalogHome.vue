<script setup>
import PrizeIcon from "@/components/icons/PrizeIcon.vue";
import PremiumIcon from "@/components/icons/PremiumIcon.vue";
import CatalogCard from "@/components/elements/cards/CatalogCard.vue";
import BonusesIcon from "@/components/icons/BonusesIcon.vue";
import GameIcon from "@/components/icons/GameIcon.vue";
import MarketIcon from "@/components/icons/MarketIcon.vue";
import NewsIcon from "@/components/icons/NewsIcon.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="ol-catalog-home column-gap-1 row-gap-1">
    <catalog-card
      :to="{
        name: 'level',
      }"
    >
      <template #icon>
        <prize-icon />
      </template>
      <template #content>{{ t("home_page.level") }}</template>
    </catalog-card>

    <catalog-card
      class="premium-catalog-card"
      :to="{
        name: 'premium',
      }"
    >
      <template #icon>
        <premium-icon />
      </template>
      <template #content>
        <span class="premium-catalog-card-yellow-text">Premium</span>
      </template>
    </catalog-card>

    <catalog-card
      :to="{
        name: 'news',
      }"
    >
      <template #icon>
        <news-icon />
      </template>
      <template #content>{{ t("home_page.news") }}</template>
    </catalog-card>

<!--    <catalog-card-->
<!--      :to="{-->
<!--        name: 'market',-->
<!--      }"-->
<!--    >-->
<!--      <template #icon>-->
<!--        <market-icon />-->
<!--      </template>-->
<!--      <template #content>{{ t("home_page.shop") }}</template>-->
<!--    </catalog-card>-->

    <!--    <catalog-card-->
    <!--      :to="{-->
    <!--        name: 'game',-->
    <!--      }"-->
    <!--    >-->
    <!--      <template #icon>-->
    <!--        <game-icon />-->
    <!--      </template>-->
    <!--      <template #content> Игры</template>-->
    <!--    </catalog-card>-->

    <catalog-card
      :to="{
        name: 'profile',
      }"
    >
      <template #icon>
        <user-icon />
      </template>
      <template #content>{{ t("home_page.profile") }}</template>
    </catalog-card>

    <catalog-card
      :to="{
        name: 'bonus-recent',
      }"
    >
      <template #icon>
        <bonuses-icon />
      </template>
      <template #content>{{ t("home_page.bonuses") }}</template>
    </catalog-card>

    <catalog-card
      :to="{
        name: 'settings',
      }"
    >
      <template #icon>
        <settings-icon />
      </template>
      <template #content>{{ t("home_page.settings") }}</template>
    </catalog-card>
  </div>
</template>

<style lang="scss" scoped>
.ol-catalog-home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.premium-catalog-card {
  background: var(--gf-p-yellow-1);

  &-yellow-text {
    @include text-gradient(
      -webkit-linear-gradient(122.82deg, #f2d207 0%, #ffa329 100%)
    );
  }
}
</style>
