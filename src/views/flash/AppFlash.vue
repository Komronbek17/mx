<script setup>
import { loadingComposable } from "@/composables/loading.composable";

import FlashHeader from "@/views/flash/components/FlashHeader.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import FlashFooter from "@/views/flash/components/FlashFooter.vue";
import FlashOptionList from "@/views/flash/components/FlashOptionList.vue";

import { useUserStore } from "@/stores/user.store";
import { useFlashStore } from "@/stores/flash.store";
import { WebAppController } from "@/utils/telegram/web.app.util";

const userStore = useUserStore();
const flashStore = useFlashStore();

const { loading, startLoading, finishLoading } = loadingComposable();

async function initialize() {
  startLoading();
  try {
    if (!(userStore.user && userStore.user.id)) {
      await userStore.initUser();
      await flashStore.fetchInfoItems({ userId: userStore.user.id });
    } else {
      await flashStore.fetchInfoItems({ userId: userStore.user.id });
    }
  } finally {
    finishLoading();
  }
}

WebAppController.ready();
initialize();
</script>

<template>
  <div class="layout-container flash__layout">
    <app-loader :active="loading" />

    <flash-header
      :me="userStore.user"
      :user-balance="flashStore.details.balanceUser"
    />

    <flash-option-list />

    <div class="flash__footer">
      <flash-footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  color: var(--text-main);
}

.flash__layout {
  padding-bottom: 24rem;
  position: relative;
}

.flash__footer {
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid var(--accent-gray);
  background: var(--gf-bg-main);
  box-shadow: 0 4px 24px 0 rgba(51, 51, 51, 0.08);
  width: 100%;
}
</style>
