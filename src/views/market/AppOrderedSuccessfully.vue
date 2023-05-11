<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="order-success">
    <div class="layout-container flex flex-column align-center justify-center">
      <img src="@/assets/images/success.svg" alt="" />
      <h4>{{ t("market_page.ordered_successfully") }}</h4>
      <p>{{ t("market_page.order_status") }}</p>
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/images/arrow-left.svg" alt="" />
        <span>{{ t("back_to_main") }}</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-success {
  & img {
    margin-bottom: 40px;
    background-color: transparent;
  }

  & h4 {
    @extend .heading-2;
    color: var(--text-main);
    margin-bottom: 6px;
    text-align: center;
  }

  & p {
    @extend .text-16-400;
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: 16px;
  }

  & a {
    display: flex;
    align-items: center;
    padding: 10px 40px;
    background: var(--accent-yellow);
    border-radius: 8px;
    margin-bottom: 1rem;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin: 0 10px 0 0;
    }

    & span {
      @extend .text-16-500;
      color: var(--neutral-white);
    }
  }
}
</style>
