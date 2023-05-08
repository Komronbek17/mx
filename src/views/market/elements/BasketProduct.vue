<script setup>
import { computed } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MinusIcon from "@/components/icons/MinusIcon.vue";
import AppSpinnerLoader from "@/components/elements/loader/AppSpinnerLoader.vue";
import { useI18n } from "vue-i18n";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";
import { useToast } from "vue-toastification";

const emits = defineEmits(["update-quantity", "inactivate-product"]);
const { t } = useI18n();
const toast = useToast();
const props = defineProps({
  basketItem: {
    type: Object,
    required: true,
  },
});
const isAvailable = computed(() => props.basketItem["is_available"]);
const productBlockClass = computed(() => {
  return [
    // {
    //   "limit-border": props.basketItem?.isActive && isBasketQtyFull.value,
    // },
    {
      "inactive-border": !props.basketItem?.isActive,
    },
    props.basketItem["is_available"] ? "success-border" : "blur",
  ];
});
const basketId = computed(() => props.basketItem?.id);
const limitQuantity = computed(() => props.basketItem?.product.qty);
const currentQuantity = computed(() => props.basketItem?.quantity);
const isBasketQtyFull = computed(
  () => limitQuantity.value === currentQuantity.value
);

const {
  loading: isBasketUpdating,
  startLoading: startBasketUpdating,
  finishLoading: finishBasketUpdating,
} = loadingComposable();

const {
  loading: isSavingToBasket,
  startLoading: startSaving,
  finishLoading: finishSaving,
} = loadingComposable();

const isActive = computed(() => props.basketItem["is_available"]);

async function addToBasket({ quantity = 1 }) {
  if (isSavingToBasket.value) {
    return;
  }

  try {
    startSaving();
    const response = await coinApi.basketUpdateItem({
      body: {
        quantity,
        id: basketId.value,
      },
    });

    if (response) {
      emits("update-quantity", { productId: basketId.value, quantity });
    }
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  } finally {
    finishSaving();
  }
}

async function increaseBasketItem({ count = 1 }) {
  if (!isActive.value && isBasketUpdating.value) {
    return;
  }

  try {
    startBasketUpdating();
    if (limitQuantity.value >= currentQuantity.value + count) {
      await addToBasket({
        quantity: currentQuantity.value + count,
      });
    }
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  } finally {
    finishBasketUpdating();
  }
}

async function decreaseBasketItem({ count = -1 }) {
  if (isActive.value && !isBasketUpdating.value) {
    try {
      startBasketUpdating();
      if (currentQuantity.value + count === 0) {
        await coinApi.basketRemoveItem({
          body: {
            id: basketId.value,
          },
        });
        emits("update-quantity", { productId: basketId.value, quantity: 0 });
      } else {
        await addToBasket({
          quantity: currentQuantity.value + count,
        });
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e.message);
    } finally {
      finishBasketUpdating();
    }
  }
}

function toggleSelect() {
  emits("inactivate-product", {
    productId: basketId.value,
  });
}
</script>

<template>
  <div class="product">
    <div class="product-block" :class="productBlockClass">
      <!--    TOP   -->
      <div class="product-block__top" @click="toggleSelect">
        <div class="flex">
          <div class="product-block__top-image">
            <!--            <img src="@/assets/images/level-product__image.png" alt="" />-->
            <img :src="props.basketItem.product?.images?.[0].path" alt="" />
          </div>
          <div class="product-block__top-details">
            <h4>{{ props.basketItem.product.name }}</h4>
            <div class="flex align-center">
              <img src="@/assets/images/coin.png" alt="" />
              <span>{{ props.basketItem.product.price }}</span>
            </div>
          </div>
        </div>
        <div class="product-block__tick">
          <img
            v-if="!(isAvailable && props.basketItem.isActive)"
            src="@/assets/images/tick-circle-false.svg"
            alt=""
          />
          <img v-else src="@/assets/images/tick-circle.svg" alt="" />
        </div>
      </div>
      <!--    BOTTOM   -->
      <div class="product-block__bottom">
        <div>
          <p v-if="isAvailable">
            {{ t("market_page.product_left") }}:
            <span :class="{ 'limit-warning': isBasketQtyFull }">
              {{ props.basketItem.product.qty }}
              <span v-if="props.basketItem.product.measurement">
                {{ props.basketItem.product.measurement.name }}
              </span>
            </span>
          </p>
          <p v-else class="unavailable">{{ t("market_page.unavailable") }}</p>
        </div>

        <div class="product-block__amount">
          <div class="badge minus" @click="decreaseBasketItem">
            <minus-icon color="var(--gf-text-33-gray)" />
          </div>
          <p v-if="isBasketUpdating" class="flex align-center justify-center">
            <app-spinner-loader size="24" color="var(--gf-p-loader-color)" />
          </p>
          <p v-else>
            {{ props.basketItem.quantity }}
          </p>
          <div
            class="badge plus increment-button"
            @click="increaseBasketItem"
            :class="{ 'full-qty': isBasketQtyFull }"
          >
            <plus-icon
              :color="
                isBasketQtyFull
                  ? 'var(--gf-text-33-gray)'
                  : 'var(--gf-text-33-gray)'
              "
            />
          </div>
        </div>
      </div>

      <div class="limit-warning mt-1" v-if="isBasketQtyFull">
        Вы уже добавили максимальное количество товаров
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  background-color: #f5f5f5;
}
.product {
  &-block {
    background: var(--gf-bg-main);
    border-radius: 8px;
    border: 1px solid #2a3139;
    padding: 1rem;
    margin-bottom: 1rem;
    height: 100%;

    &.success-border {
      border: 1px solid #01cc6b;
    }

    &.inactive-border {
      border: 1px solid var(--gf-bg-main);
    }

    &.limit-border {
      border: 1px solid #ffb914;
    }

    &.blur {
      filter: blur(4px);
      border: none;
    }

    &__top {
      display: flex;
      align-items: start;
      justify-content: space-between;
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

      p {
        min-width: 24px;
        text-align: center;
      }

      .badge {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        line-height: 32px;
        font-size: 24px;
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

.unavailable {
  font-size: 14px;
  line-height: 18px;
  color: var(--gf-notification-text-bg);
}

.limit-warning {
  font-size: 14px;
  line-height: 18px;
  background: linear-gradient(122.82deg, #f2d207 0%, #ffa329 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.increment-button.full-qty {
  background: var(--gf-text-secondary-gray);
}
</style>
