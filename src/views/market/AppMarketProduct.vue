<script setup>
import { WebAppController } from "@/utils/telegram/web.app.util";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave } from "vue-router";

const { t } = useI18n();

async function showOrderProducts() {
  console.log(1);
}

MainButtonController.run();
MainButtonController.setText(`${t("market_page.show_order")}`);
MainButtonController.setBackgroundColor("#01E075");
MainButtonController.onClick(showOrderProducts);

onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
});

WebAppController.ready();
</script>

<template>
  <div class="market-product">
    <div class="market-product__image">
      <img src="@/assets/images/level-product__image.png" alt="" />
    </div>
    <div class="layout-container">
      <div class="flex align-center">
        <p class="market-product__title">Наушники JBL Everest V700BT BLK</p>
        <div class="flex align-center market-product__price">
          <img src="@/assets/images/coin.png" alt="" />
          <p>1000</p>
        </div>
      </div>
      <p class="market-product__amount">Количество: <span>10 шт</span></p>
      <p class="market-product__description-title">Описание</p>
      <p class="market-product__description">
        Наушники JBL Everest V700BT BLK – беспроводная модель полноразмерного
        типа с системой пассивного шумо-подавления. Благодаря энергоемкому
        аккумулятору. Устройство способно проработать беспрерывно до 25 часов в
        режиме разговора. Аккумулятор под-заряжается легко,тем самым вам не
        придется думать о частой смене батареек.
      </p>
      <button class="market-product__btn">
        <img src="@/assets/images/add.svg" alt="" />
        <p>В корзину</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "market-product-styles.scss";
</style>
