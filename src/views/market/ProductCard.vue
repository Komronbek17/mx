<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emits = defineEmits(["update-product-basket", "ask-activate"]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

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

const isProductType = computed(() => card.type === "product");

function askActivate() {
  emits("ask-activate");
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
        <img src="@/assets/icons/fitcoin.svg" alt="" />
        <p>{{ props.item.price }}</p>
      </div>
    </div>

    <div
      v-if="isProductType"
      @click="viewProduct"
      class="gift-card__button flex"
    >
      <p>{{ $t("market_page.detail") }}</p>
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
