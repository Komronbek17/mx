<script setup>
import CatalogHome from "@/components/home/CatalogHome.vue";
import OltinBaliqIcon from "@/components/icons/OltinBaliqIcon.vue";
import UserCardHome from "@/components/home/UserCardHome.vue";

import { useTelegramStore } from "@/stores/telegram.store";
import { useTelegram } from "@/composables/telegram.composable";

const { tUserFullName } = useTelegramStore();
const { tUserUniqueId, checkTelegramUser } = useTelegram();

checkTelegramUser();

</script>

<template>
  <div class="app-home">
    <!--    <p class="ol-main-title">-->
    <!--      Теперь вы можете получать бонусы и набирать баллы! Для просмотра доступных-->
    <!--      призов и шкалы заполнения баллов, скачайте приложение Oltin Baliq-->
    <!--    </p>-->

    <user-card-home
      :user-full-name="tUserFullName"
      :user-unique-id="tUserUniqueId"
      class="mb-1"
    />

    <div class="ol-main-banner mb-1">
      <img
        src="@/assets/images/home-card-layout.png"
        alt="banner"
        class="ol-main-banner-image"
      />
      <div
        class="ol-main-banner-content flex flex-column align-center justify-around"
      >
        <oltin-baliq-icon />
        <div class="flex flex-column justify-center align-center">
          <span class="ol-main-banner-message">Испытать удачу</span>
        </div>
      </div>
    </div>

    <catalog-home />
  </div>
</template>

<style lang="scss" scoped>
.app-home {
  padding: 1rem;
}

.ol-main-title {
  font-weight: 400;
  font-size: 1rem;
}

.ol-main-banner {
  position: relative;
  height: 98px;

  &-image {
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }

  &-content {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }

  &-message {
    color: white;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }

  &-user-id {
    color: white;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
