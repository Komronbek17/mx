<script setup>
import {defineProps} from "vue";

const emit = defineEmits()
defineProps({
    modelValue: Boolean,
});

const closePopover = () => {
    emit('close-popover')
}

</script>

<template>
    <transition name="popover">
        <div v-show="modelValue">
            <div @click="closePopover" class="backdrop"/>
            <div class="modal">
                <div @click="closePopover" class="popover-close">
                    <img src="@/assets/images/close.svg" alt="">
                </div>
                <slot name="header"/>
                <slot name="content"/>
                <slot name="footer"/>
            </div>
        </div>
    </transition>
</template>
<style lang="scss" src="popover.scss"/>
