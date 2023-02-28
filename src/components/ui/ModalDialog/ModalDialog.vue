<script setup>
import {defineProps} from "vue";

const emit = defineEmits()
defineProps({
    modelValue: Boolean,
});

import {useSlots} from 'vue'

const slots = useSlots()

const closeModal = () => {
    emit('close-modal')
}

</script>

<template>
    <transition name="modal">
        <div v-show="modelValue">
            <div @click="closeModal" class="backdrop"/>
            <div class="modal">
                <div @click="closeModal" class="modal-close">
                    <img src="@/assets/images/close.svg" alt="">
                </div>
                <slot v-if="slots.header" name="header"/>
                <slot v-if="slots.content" name="content"/>
                <slot v-if="slots.footer" name="footer"/>
            </div>
        </div>
    </transition>
</template>
<style lang="scss" src="./ModalDialog.scss"/>
