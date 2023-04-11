<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

const emits = defineEmits(['add-basket', 'ask-activate'])
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

function askActivate() {
  emits('ask-activate')
}

function addBasket() {
  emits('add-basket')
}

const checkIsProduct = props.item['type'] === 'product'

const checkProductIsBasket = checkIsProduct && props.item['basket']


function incrementTotal() {
  console.log('incrementTotal')
}

function decrementTotal() {
  console.log('decrementTotal')
}

function viewProduct(){
  return router.push({ name: 'market-product', params: { id: props.item['id'] } })
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
        <img src="@/assets/images/coin.png" alt=""/>
        <p>{{ props.item.price }}</p>
      </div>
    </div>
    <div
        v-if="checkProductIsBasket"
        class="gift-card__counter"
    >
      <div @click="decrementTotal" class="gift-card__button">
        <img src="@/assets/icons/minus.svg" alt="minus">
      </div>
      <p>5</p>
      <div @click="incrementTotal" class="gift-card__button">
        <img src="@/assets/icons/add.svg" alt="add">
      </div>
    </div>
    <div
        v-else-if="checkIsProduct"
        @click="addBasket"
        class="gift-card__button"
    >
      <p>{{ $t("market_page.to_basket") }}</p>
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
    row-gap: .5rem;

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
      column-gap: .5rem;

      p {
        @extend .font-15;
        @include text-gradient(linear-gradient(122.82deg, #F2D207 0%, #FFA329 100%))
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
    background: linear-gradient(122.82deg, #F2D207 0%, #FFA329 100%);
    border-radius: 16px;
    padding: 7px 14px;

    p {
      @extend .font-14-white;
      color: var(--gf-text-white-2x);
    }
  }

  &__counter {
    display: flex;
    align-items: center;
    column-gap: .5rem;

    p{
      @extend .heading-3;
      letter-spacing: -0.4px;
      color: var(--gf-text-33);
      max-width: 60px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    & .gift-card__button {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 2rem;
      max-height: 2rem;
      padding: .25rem !important;
    }

  }
}
</style>