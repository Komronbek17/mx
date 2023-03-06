<script setup>
import { WebAppController } from "@/utils/telegram/web.app.util";

WebAppController.ready();
</script>

<template>
  <div class="level-product">
    <div class="level-product__image">
      <img src="@/assets/images/level-product__image.png" alt="" />
    </div>
    <div class="layout-container">
      <p class="level-product__title">Наушники JBL Everest V700BT BLK</p>
      <p class="level-product__amount">Количество: <span>10 шт</span></p>
      <p class="level-product__description-title">Описание</p>
      <p class="level-product__description">
        Наушники JBL Everest V700BT BLK – беспроводная модель полноразмерного
        типа с системой пассивного шумо-подавления. Благодаря энергоемкому
        аккумулятору. Устройство способно проработать беспрерывно до 25 часов в
        режиме разговора. Аккумулятор под-заряжается легко,тем самым вам не
        придется думать о частой смене батареек.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/views/level/level-product/level-product.scss";
</style>
