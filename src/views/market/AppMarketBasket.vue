<script setup>
</script>

<template>
  <div class="basket">
    <div class="layout-container">
      <div class="basket-title">
        <p>Ваш заказ</p>
        <router-link to="#">Изменить</router-link>
      </div>

      <div class="basket-products">

        <div class="basket-product">
          <div class="basket-product__image">
            <img src="@/assets/images/basket-2.png" alt="">
          </div>

          <div class="basket-product__details">
            <div class="flex flex-column">
              <p class="basket-product__name">Мышь</p>
              <span class="basket-product__model">Модель</span>
            </div>
            <div class="basket-product__price">
              <img src="@/assets/images/coin.png" alt="">
              <span>300</span>
            </div>
          </div>
        </div>

        <div class="basket-product">
          <div class="basket-product__image">
            <img src="@/assets/images/basket-1.png" alt="">
          </div>

          <div class="basket-product__details">
            <div class="flex flex-column">
              <p class="basket-product__name">Smart Watch</p>
              <span class="basket-product__model">Модель</span>
            </div>
            <div class="basket-product__price">
              <img src="@/assets/images/coin.png" alt="">
              <span>700</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basket {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    & p {
      @extend .text-15-600;
      color: var(--text-main);
      text-transform: uppercase;
    }

    & a {
      @extend .text-15-600;
      display: block;
      background: var(--gradient-green);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  &-product {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid var(--accent-gray);

    &:last-child {
      border-bottom: none;
    }

    &__image {
      min-width: 44px;
      width: 44px;
      height: 32px;
      padding: 6px 0;
      background: var(--accent-gray);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      margin-right: 1rem;

      & img {
        height: 100%;
        object-fit: contain;
      }
    }

    &__details {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__name {
      @extend .text-15-600;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    &__model {
      @extend .text-14-400;
      color: var(--text-secondary);
    }

    &__price {
      display: flex;
      align-items: center;

      & img {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin-right: 8px;
      }

      & span {
        display: block;
        @extend .text-14-500;
        color: var(--accent-yellow);
      }
    }
  }
}
</style>
