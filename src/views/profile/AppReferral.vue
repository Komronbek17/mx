<script setup>
import { useRoute } from "vue-router";
import { WebAppController } from "@/utils/telegram/web.app.util";

const route = useRoute();

WebAppController.ready();
</script>

<template>
  <div class="referral">
    <div class="layout-container">
      <div class="flex flex-column align-center">
        <div class="referral-image">
          <img src="@/assets/images/profile-image.svg" alt="" />
        </div>

        <p class="referral-name">Отабек Каримов</p>
        <span class="referral-score">120 баллов</span>

        <div></div>
      </div>

      <div class="referral-tabs">
        <router-link
          :to="{ name: 'referral-view', params: {} }"
          class="referral-tab"
          :class="route.name === 'referral-view' ? 'router-link-active' : ''"
        >
          Рефералы
        </router-link>
        <router-link
          :to="{ name: 'referral-bonus', params: {} }"
          class="referral-tab"
          :class="route.name === 'referral-bonus' ? 'router-link-active' : ''"
          >Бонусы</router-link
        >
      </div>

      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.referral {
  &-image {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-name {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    text-align: right;
    letter-spacing: -0.4px;
    color: #090909;
    margin-bottom: 0.5rem;
  }

  &-score {
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: #00cb6a;
    margin-bottom: 1.5rem;
  }

  &-tabs {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f5f5;
    border-radius: 72px;
    height: 50px;
    padding: 4px 8px;
    margin: 0 auto 1rem;
  }

  &-tab {
    font-weight: 600;
    font-size: 17px;
    line-height: 129%;
    text-align: center;
    color: #797d81;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 1rem;

    &.router-link-active {
      color: #fff !important;
      background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
      border-radius: 72px;
    }
  }
}
</style>
