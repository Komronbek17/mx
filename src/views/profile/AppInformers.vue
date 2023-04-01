<script setup>
import { useI18n } from "vue-i18n";
import { WebAppController } from "@/utils/telegram/web.app.util";

const { t } = useI18n();
WebAppController.ready();
</script>

<template>
  <div class="informers">
    <div class="layout-container">
      <div class="informers-item">
        <div class="informers-item__image">
          <img src="@/assets/images/informers-income-icon.svg" alt="" />
        </div>
        <div class="w-100 flex align-center justify-between">
          <p class="informers-item__text">
            {{ t("profile_page.informers.balance") }}
          </p>
          <span class="informers-item__sum"
            >200 {{ t("profile_page.informers.coin_amount") }}</span
          >
        </div>
      </div>

      <div class="informers-item">
        <div class="informers-item__image">
          <img src="@/assets/images/informers-calendar-icon.svg" alt="" />
        </div>
        <div class="w-100 flex align-center justify-between">
          <p class="informers-item__text">
            {{ t("profile_page.informers.daily_usage") }}
          </p>
          <span class="informers-item__sum"
            >200 {{ t("profile_page.informers.coin_amount") }}</span
          >
        </div>
      </div>

      <div class="informers-item">
        <div class="informers-item__image">
          <img src="@/assets/images/informers-ad-icon.svg" alt="" />
        </div>
        <div class="w-100 flex align-center justify-between">
          <p class="informers-item__text">
            {{ t("profile_page.informers.ads") }}
          </p>
          <span class="informers-item__sum"
            >200 {{ t("profile_page.informers.coin_amount") }}</span
          >
        </div>
      </div>

      <div class="informers-item">
        <div class="informers-item__image">
          <img src="@/assets/images/informers-like-icon.svg" alt="" />
        </div>
        <div class="w-100 flex align-center justify-between">
          <p class="informers-item__text">
            {{ t("profile_page.informers.rec_app") }}
          </p>
          <span class="informers-item__sum"
            >200 {{ t("profile_page.informers.coin_amount") }}</span
          >
        </div>
      </div>

      <div class="informers-item">
        <div class="informers-item__image">
          <img src="@/assets/images/informers-telegram-icon.svg" alt="" />
        </div>
        <div class="w-100 flex align-center justify-between">
          <p class="informers-item__text">
            {{ t("profile_page.informers.rec_bot") }}
          </p>
          <span class="informers-item__sum"
            >200 {{ t("profile_page.informers.coin_amount") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.informers {
  &-item {
    height: 32px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 1rem;
    background: var(--gf-hover-bg);
    border-radius: 8px;

    &__image {
      min-width: 32px;
      height: 32px;
      margin-right: 1rem;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__text {
      width: 60%;
      font-weight: 500;
      font-size: 16px;
      line-height: 125%;
      letter-spacing: -0.32px;
      color: var(--gf-text-33);
    }

    &__sum {
      font-weight: 500;
      font-size: 14px;
      line-height: 129%;
      text-align: right;
      color: #00db72;
    }
  }
}
</style>
