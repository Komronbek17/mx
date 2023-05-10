<script setup>
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";
import AppSpinnerLoader from "@/components/elements/loader/AppSpinnerLoader.vue";
import { computed, reactive } from "vue";

const router = useRouter();
const toast = useToast();
const emits = defineEmits(["update-product-basket", "ask-activate"]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const {
  loading: isSavingToBasket,
  startLoading: startSaving,
  finishLoading: finishSaving,
} = loadingComposable();

const {
  loading: isBasketUpdating,
  startLoading: startBasketUpdating,
  finishLoading: finishBasketUpdating,
} = loadingComposable();

const card = reactive({
  basket: null,
  description: "",
  id: null,
  images: [],
  measurement: {
    name: "",
  },
  name: "",
  price: 0,
  qty: 0,
  type: null,
  ...Object.assign({}, props.item),
  quantity: props.item?.basket?.quantity ?? 0,
});
const basketId = computed(() => card?.basket?.id ?? null);
const isProductType = computed(() => card.type === "product");
const savedInBasket = computed(() => isProductType.value && card.basket);
const limitQuantity = computed(() => card.qty);
const isBasketQtyFull = computed(() => limitQuantity.value === card.quantity);

function askActivate() {
  emits("ask-activate");
}

async function addToBasket({ quantity = 1 }) {
  if (isSavingToBasket.value) {
    return;
  }

  try {
    startSaving();
    const response = await coinApi.basketAddItem({
      body: {
        quantity,
        product_id: props.item["id"],
      },
    });
    card.basket = {
      ...response.data.result,
      product_id: response.data.result.product.id,
    };
    card.quantity = quantity;
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  } finally {
    finishSaving();
  }
}

async function increaseBasketItem({ count = 1 }) {
  if (isBasketUpdating.value) {
    return;
  }

  try {
    startBasketUpdating();
    if (limitQuantity.value >= card.quantity + count) {
      await addToBasket({
        quantity: card.quantity + count,
      });
    }
  } catch (e) {
    card.quantity -= count;
    toast.error(e.response.data.message ?? e.message);
  } finally {
    finishBasketUpdating();
  }
}

async function decreaseBasketItem({ count = -1 }) {
  if (isBasketUpdating.value) {
    return;
  }

  const basket = Object.assign(card.basket);
  try {
    startBasketUpdating();
    if (card.quantity + count === 0) {
      await coinApi
        .basketRemoveItem({
          body: {
            id: basketId.value,
          },
        })
        .then(() => {
          card.basket = null;
        });
    } else {
      await addToBasket({
        quantity: card.quantity + count,
      });
    }
  } catch (e) {
    card.basket = basket;
    card.quantity -= count;
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishBasketUpdating();
  }
}

function viewProduct() {
  if (isProductType.value) {
    router.push({
      name: "market-product",
      params: { id: props.item["id"] },
    });
  }
}
</script>

<template>
  <div class="gift-card">
    <div @click="viewProduct" class="gift-card__image">
      <img
        :src="props.item.images[0]?.path || '@/assets/images/no-photo.svg'"
        alt=""
      />
    </div>
    <div @click="viewProduct" class="gift-card__content">
      <h5>{{ props.item.name }}</h5>
      <div class="price">
        <img src="@/assets/icons/coin.svg" alt="" />
        <p>{{ props.item.price }}</p>
      </div>
    </div>
    <div v-if="savedInBasket" class="gift-card__counter">
      <div @click="decreaseBasketItem" class="gift-card__button">
        <img src="@/assets/icons/minus.svg" alt="minus" />
      </div>
      <p v-if="isBasketUpdating" class="flex align-center justify-center">
        <app-spinner-loader size="24" color="var(--gf-p-loader-color)" />
      </p>
      <p v-else>{{ card.quantity }}</p>
      <div
        @click="increaseBasketItem"
        class="gift-card__button"
        :class="{ 'full-qty': isBasketQtyFull }"
      >
        <img src="@/assets/icons/add.svg" alt="add" />
      </div>
    </div>
    <div
      v-else-if="isProductType"
      @click="addToBasket"
      class="gift-card__button flex"
    >
      <p>{{ $t("market_page.to_basket") }}</p>
      <app-spinner-loader
        v-if="isSavingToBasket"
        size="20"
        class="ml-0-5"
        color="#FFFFFF"
      />
    </div>
    <div v-else @click="askActivate" class="gift-card__button">
      <p>{{ $t("market_page.activate") }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gift-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  padding: 16px 10px;
  background: var(--gf-hover-bg);
  border-radius: 8px;
  max-width: 300px;

  &__image {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;

    h5 {
      @extend .font-h5;
      text-align: center;
      max-width: 140px;
      height: 44px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: var(--gf-text-33);
    }

    .price {
      display: flex;
      column-gap: 0.5rem;

      p {
        @extend .font-15;
        @include text-gradient(
          linear-gradient(122.82deg, #f2d207 0%, #ffa329 100%)
        );
      }

      img {
        width: 100%;
        max-width: 20px;
        max-height: 20px;
        object-fit: contain;
      }
    }
  }

  &__button {
    cursor: pointer;
    background: linear-gradient(122.82deg, #f2d207 0%, #ffa329 100%);
    border-radius: 16px;
    padding: 7px 14px;

    p {
      @extend .font-14-white;
      color: var(--gf-text-white-2x);
    }
  }

  &__button.full-qty {
    background: var(--gf-text-secondary-gray);
  }

  &__counter {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;

    p {
      @extend .heading-3;
      letter-spacing: -0.4px;
      color: var(--gf-text-33);
      max-width: 60px;
      text-overflow: ellipsis;
      overflow: hidden;
      min-width: 24px;
      text-align: center;
    }

    & .gift-card__button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 2rem;
      max-height: 2rem;
      padding: 0.25rem !important;
    }
  }
}
</style>
