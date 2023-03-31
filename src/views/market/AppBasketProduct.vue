<script setup>
import { ref } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MinusIcon from "@/components/icons/MinusIcon.vue";

const isAvailable = ref(true);
</script>

<template>
  <div class="product">
    <div class="layout-container">
      <div class="product-block" :class="isAvailable ? 'success-border' : ''">
        <!--    TOP   -->
        <div class="product-block__top">
          <div class="product-block__top-image">
            <img src="@/assets/images/level-product__image.png" alt="" />
          </div>
          <div class="product-block__top-details">
            <h4>Наушники JBL Everest V700BT BLK</h4>
            <div class="flex align-center">
              <img src="@/assets/images/coin.png" alt="" />
              <span>1000</span>
            </div>
          </div>
          <div class="product-block__tick">
            <img
              v-if="!isAvailable"
              src="@/assets/images/tick-circle-false.svg"
              alt=""
            />
            <img src="@/assets/images/tick-circle.svg" alt="" />
          </div>
        </div>

        <!--    BOTTOM   -->
        <div class="product-block__bottom">
          <div>
            <p v-if="isAvailable">Осталось: <span>50 шт</span></p>
            <p v-else>Нет в наличии</p>
          </div>

          <div class="product-block__amount">
            <div class="badge minus">
              <minus-icon color="var(--gf-text-white-2x)" />
            </div>
            <p>1</p>
            <div class="badge plus">
              <plus-icon color="var(--gf-text-white-2x)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  &-block {
    background: var(--gf-bg-main);
    border-radius: 8px;
    border: 1px solid #2a3139;
    padding: 1rem;

    &.success-border {
      border: 1px solid #01cc6b;
    }

    &__top {
      display: flex;
      align-items: start;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gf-basket-product-image-bg);

      &-image {
        width: 64px;
        min-width: 64px;
        height: 64px;
        padding: 0.5rem;
        background: var(--gf-basket-product-image-bg);
        border-radius: 8px;
        margin-right: 1rem;

        & img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      &-details {
        & h4 {
          @extend .text-15-600;
          color: var(--gf-text-33);
          margin-bottom: 0.5rem;
        }

        & img {
          width: 24px;
          height: 24px;
          object-fit: contain;
          margin-right: 0.5rem;
        }

        & span {
          font-size: 17px;
          font-weight: 600;
          color: #ffb914;
        }
      }
    }

    &__tick {
      & img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;

      & p {
        @extend .text-14-400;
        color: var(--gf-text-secondary-gray-2x);

        & span {
          color: var(--gf-text-33);
        }
      }
    }

    &__amount {
      display: flex;
      align-items: center;

      .badge {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        line-height: 32px;
        font-size: 24px;
        color: red;
        background-color: var(--gf-basket-product-image-bg);
      }

      & p {
        font-size: 17px;
        line-height: 32px;
        font-weight: 600;
        margin: 0 12px;
        color: var(--gf-text-33);
      }
    }
  }
}
</style>
