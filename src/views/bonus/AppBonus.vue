<script setup>

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {ref} from "vue";
import {productApi} from "@/services/product.service";

const router = useRouter();
const toast = useToast();

const gifts = ref([])
const getProducts = async () => {
    try {
        const body = {
            method: "coin.get_all_products",
            params: {
                page: 1,
                limit: 10,
            }
        }
        const {data} = await productApi.fetchProducts(body);
        console.log(data, 'data');
        gifts.value = data.result

    } catch ({response}) {
        toast.error(response.data.message);
    }
}


getProducts()

</script>


<template>
  <div class="layout-container">
    <div class="bonus-block">
      <div class="bonus-card">
        <div class="bonus-card__title">Баланс:</div>
        <div class="bonus-card__price">
          <img src="@/assets/images/coin.png" alt="" />
          <p>1000</p>
        </div>
      </div>
    </div>

        <div class="gifts-block">
            <div class="gift-title">
                Призы
            </div>
            <div class="gift-list">
                <div v-for="gift in gifts" :key="gift.id + '_level_1'" class="gift-card">
                    <div class="gift-card__image">
                        <img :src="gift.image" alt="">
                    </div>
                    <div class="gift-card__content">
                        <h5>{{ gift.name }} </h5>
                        <div class="price">
                            <img src="@/assets/images/coin.png" alt="">
                            <p>{{ 1000 }}</p>
                        </div>
                    </div>
                    <div class="gift-card__button">
                        <p>В корзину</p>
                    </div>
                </div>


            </div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
@import "bonus-style";
</style>
