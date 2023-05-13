<script setup>
import { useRoute } from "vue-router";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
WebAppController.ready();
</script>

<template>
  <div class="history">
    <div class="history-block">
      <div class="history-tabs">
        <!--        <router-link-->
        <!--          :to="{ name: 'bonus-active', params: {} }"-->
        <!--          class="history-tab"-->
        <!--          :class="route.name === 'bonus-active' ? 'active' : ''"-->
        <!--        >-->
        <!--          Активные-->
        <!--        </router-link>-->
        <router-link
          :to="{ name: 'bonus-recent', params: {} }"
          class="history-tab"
          :class="route.name === 'bonus-recent' ? 'router-link-active' : ''"
        >
          {{ t("bonus_page.recent") }}
        </router-link>
        <router-link
          :to="{ name: 'bonus-active', params: {} }"
          class="history-tab"
          :class="route.name === 'bonus-active' ? 'router-link-active' : ''"
        >
          {{ t("bonus_page.active") }}
        </router-link>
        <router-link
          :to="{ name: 'bonus-prize', params: {} }"
          class="history-tab"
          :class="route.name === 'bonus-prize' ? 'router-link-active' : ''"
        >
          {{ t("bonus_page.prizes") }}
        </router-link>
        <!--        <router-link-->
        <!--          :to="{ name: 'bonus-archive', params: {} }"-->
        <!--          class="history-tab"-->
        <!--          :class="route.name === 'bonus-archive' ? 'active' : ''"-->
        <!--        >-->
        <!--          Архив-->
        <!--        </router-link>-->
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.history {
  padding: 0;

  &-block {
    position: relative;
    z-index: 0;

    &::after {
      content: "";
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      background: var(--gf-hover-bg);
    }
  }

  &-tabs {
    position: relative;
    padding: 0 1rem;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    column-gap: 20px;
  }

  &-tab {
    @extend .text-16-600;
    position: relative;
    color: var(--gf-input-text);
    text-decoration: none;
    z-index: 1232;
    padding: 16px 0 12px;
    width: 50%;
    text-align: center;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 100px;
    }

    &.router-link-active {
      //@include text-gradient(
      //  linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%)
      //);

      color: var(--gradient-purple);

      &::after {
        background: var(--gradient-purple);
      }
    }
  }
}
</style>
