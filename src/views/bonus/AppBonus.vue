<script setup>

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {ref} from "vue";
import {productApi} from "@/services/product.service";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";

const router = useRouter();
const toast = useToast();

const gifts = ref([])

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

        await productApi.activateProduct(body).then((res) => {
            console.log(res.data, 'res data');
        }).catch((error) => {
            console.log(error, 'error data');
        })
    }

}


getProducts()

</script>


<template>
    <div class="layout-container">
        bonus
    </div>
</template>


<style lang="scss" scoped>
</style>
