<script setup>

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {ref} from "vue";
import {productApi} from "@/services/product.service";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";

const router = useRouter();
const toast = useToast();

const gifts = ref([])
const balance = ref(0)

const modalValue = ref(false)
const activeId = ref(null)

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
        gifts.value = data.result

    } catch ({response}) {
        toast.error(response?.data?.message);
    }
}


const fetchBalance = async () => {
    try {
        const {data} = await productApi.getBalance();

        balance.value = data.balance

    } catch ({response}) {
        toast.error(response?.data?.message);
    }
}
const askActivate = (id) => {
    activeId.value = id
    openModal()
}


const closeDialogModal = () => {
    modalValue.value = false
    activeId.value = null
}

const openModal = () => {
    modalValue.value = true
}
const modalApply = () => {
    submitActive()
    modalValue.value = false
}


const addBasket = () => {
    console.log('addBasket');
}

const submitActive = async () => {
    if (activeId.value) {
        const body = {
            method: 'coin.activation_product',
            params: {
                id: activeId.value
            }
        }

        try {
            const {data} = await productApi.activateProduct(body)
            console.log(data);
        } catch (e) {
            toast.error(e.response?.data?.message ?? e.message);
        }

    }

}


fetchBalance()
getProducts()

</script>


<template>
    <div class="layout-container">
        <div class="bonus-block">
            <div class="bonus-card">
                <div class="bonus-card__title">Баланс:</div>
                <div class="bonus-card__price">
                    <img src="@/assets/images/coin.png" alt=""/>
                    <p>{{ balance }}</p>
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
                        <img :src="gift.images[0]?.path || '@/assets/images/no-photo.svg'" alt="">
                    </div>
                    <div class="gift-card__content">
                        <h5>{{ gift.name }}</h5>
                        <div class="price">
                            <img src="@/assets/images/coin.png" alt="">
                            <p>{{ gift.price }}</p>
                        </div>
                    </div>
                    <div v-if="gift.type ==='product'" @click="addBasket(gift.id)" class="gift-card__button">
                        <p>В корзину</p>
                    </div>
                    <div v-else @click="askActivate(gift.id)" class="gift-card__button">
                        <p>Активировать</p>
                    </div>
                </div>
            </div>

        </div>

        <modal-dialog :model-value="modalValue" @close-modal="closeDialogModal">
            <template #header>
                <div class="modal-header">
                    <img src="@/assets/images/2x-blue.png" alt="">
                </div>
            </template>
            <template #content>
                <div class="modal-content">
                    <h3 class="modal-content__title">Активировано!</h3>
                    <p class="modal-content__subtitle">2Х бонус 1го уровня успешно активирован!</p>
                </div>
            </template>
            <template #footer>
                <div class="modal-footer">
                    <div @click="modalApply" class="modal-footer__button btn-yellow">Окей</div>
                </div>
            </template>
        </modal-dialog>

    </div>
</template>


<style lang="scss" scoped>
@import "market-style";
</style>
