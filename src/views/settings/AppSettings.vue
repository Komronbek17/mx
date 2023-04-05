<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppLoader from "@/components/elements/loader/AppLoader.vue";

import { subscribeApi } from "@/services/subscribe.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";

const { t } = useI18n();
const isSubscribed = ref(true);
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();
const getStatus = async () => {
  startLoading();
  try {
    const response = await subscribeApi.fetchStatus();
    isSubscribed.value = response.data.isSubscribed || null;
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

      <router-link :to="{ name: 'profile-privacy' }" class="settings-card">
        <img src="@/assets/images/document-icon.svg" alt="" />
        <p>{{ t("public_offer") }}</p>
      </router-link>

      <router-link :to="{ name: 'settings-unsubscribe' }" class="settings-card">
        <!--          <div class="card-belt" :class="isSubscribed ? 'active' : 'deActive'">-->
        <!--            <p v-if="isSubscribed"> {{ t("settings_page.active") }} </p>-->
        <!--            <p v-else> {{ t("settings_page.deactive") }} </p>-->
        <!--          </div>-->
        <img src="@/assets/images/message-icon.svg" alt="" />
        <p class="subscribe" v-if="isSubscribed">
          {{ t("settings_page.unsubscribe") }}
          <span class="active">
            {{ t("settings_page.active") }}
          </span>
        </p>
        <p class="subscribe" v-else>
          {{ t("settings_page.subscribe") }}
          <span class="deActive">
            {{ t("settings_page.deactive") }}
          </span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  &-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  &-card {
    position: relative;
    overflow: hidden;
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

    p {
      display: flex;
      flex-direction: column;
      row-gap: 0.25rem;
      @extend .font-15-small-dark;
      color: var(--gf-text-09);
      text-align: center;

      .active {
        @extend .font-14;
        @include text-gradient(var(--gf-green-gradient));
      }

      .deActive {
        @extend .font-14;
        color: var(--gf-notification-text-bg);
      }
    }
  }
}

//.card-belt {
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  position: absolute;
//
//  transform: rotate(45deg);
//  text-align: center;
//  padding: 4px 40px;
//  height: 20px;
//
//
//  p {
//    display: flex;
//    flex-direction: column;
//    row-gap: .25rem;
//    @extend .font-15-small-dark;
//    color: var(--gf-text-09);
//    text-align: center;
//
//    .active {
//      @include text-gradient(var(--gf-green-gradient));
//    }
//
//    .deActive {
//      color: var(--gf-notification-text-bg);
//    }
//  }
//
//  //&.active {
//  //  top: 17px;
//  //  right: -34px;
//  //  background: var(--gf-green-gradient);
//  //}
//  //
//  //&.deActive {
//  //  right: -45px;
//  //  top: 20px;
//  //  background-color: var(--gf-notification-text-bg);
//  //}
//
//}
</style>
