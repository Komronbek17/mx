<script setup>
import CatalogHome from "@/components/home/CatalogHome.vue";
import homeCardLayoutImage from "@/assets/images/home-card-layout.png";
import OltinBaliqIcon from "@/components/icons/OltinBaliqIcon.vue";
</script>

<template>
  <div class="app-home">
    <p class="ol-main-title">
      Теперь вы можете получать бонусы и набирать баллы! Для просмотра доступных
      призов и шкалы заполнения баллов, скачайте приложение Oltin Baliq
    </p>

    <div class="ol-main-banner mb-1">
      <img
        :src="homeCardLayoutImage"
        alt="banner"
        class="ol-main-banner-image"
      />
      <div
        class="ol-main-banner-content flex flex-column align-center justify-around"
      >
        <oltin-baliq-icon />
        <div class="flex flex-column justify-center align-center">
          <span class="ol-main-banner-message">Испытать удачу</span>
          <span class="ol-main-banner-user-id">ID: 270869</span>
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
