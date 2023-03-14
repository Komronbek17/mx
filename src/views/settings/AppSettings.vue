<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppLoader from "@/components/elements/loader/AppLoader.vue";

import { subscribeApi } from "@/services/subscribe.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";

const { t } = useI18n();
const isSubscribed = ref(null);
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();
const getStatus = async () => {
  startLoading();
  try {
    const response = await subscribeApi.fetchStatus();
    isSubscribed.value = response.data.isSubscribed;
  } finally {
    finishLoading();
  }
};

onMounted(async () => {
  await getStatus();
});

WebAppController.ready();
</script>

<template>
  <div class="settings">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div class="settings-cards">
        <router-link :to="{ name: 'settings-language' }" class="settings-card">
          <img src="@/assets/images/lang-icon.svg" alt="" />
          <p>{{ t("settings_page.change_lang") }}</p>
        </router-link>

        <!--        <router-link :to="{ name: 'settings-sound' }" class="settings-card">-->
        <!--          <img-->
        <!--            v-if="sound === true"-->
        <!--            src="@/assets/images/sound-on-icon.svg"-->
        <!--            alt=""-->
        <!--          />-->
        <!--          <img v-else src="@/assets/images/sound-off-icon.svg" alt="" />-->
        <!--          <p>Выключить звук</p>-->
        <!--        </router-link>-->

        <!--        <router-link to="#" class="settings-card">-->
        <!--          <img src="@/assets/images/document-icon.svg" alt="" />-->
        <!--          <p>Публичная оферта</p>-->
        <!--        </router-link>-->

        <router-link
          :to="{ name: 'settings-unsubscribe' }"
          class="settings-card"
        >
          <img src="@/assets/images/message-icon.svg" alt="" />
          <p v-if="!isSubscribed">{{ t("settings_page.subscribe") }}</p>
          <p v-else>{{ t("settings_page.unsubscribe") }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  &-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  &-card {
    background-color: var(--gf-accent-bg);
    border-radius: 8px;
    padding: 18px 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    text-decoration: none;

    & img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    & p {
      @extend .font-15-small-dark;
      color: var(--gf-text-09);
      text-align: center;
    }
  }
}
</style>
