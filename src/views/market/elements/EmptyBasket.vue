<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
import { useRouter } from "vue-router";

const router = useRouter();

function openMarketPage() {
  router.push({
    name: "market",
  });
}
</script>

<template>
  <div class="empty">
    <div class="layout-container empty-block">
      <img src="@/assets/images/empty-cart.svg" alt="" />
      <h3>{{ t("market_page.empty_cart") }}</h3>
      <p>Похоже вы еще не добавили товары в вашу корзину</p>
      <button @click="openMarketPage">
        <span>Перейти в маркет</span>
        <img src="@/assets/images/arrow-right.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  height: 100vh;

  &-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    & img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }

    & h3 {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: var(--gf-text-33);
      margin-bottom: 8px;
    }

    & p {
      width: 70%;
      text-align: center;
      @extend .text-16-400;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    & button {
      width: 236px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--gf-text-blue);
      border-radius: 8px;
      padding: 0;

      & span {
        @extend .text-15-600;
        color: var(--neutral-white);
      }

      & img {
        width: 24px;
        height: 24px;
        object-fit: contain;
        margin-left: 10px;
      }
    }
  }
}
</style>
