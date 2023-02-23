<template>
  <transition name="modal">
    <div
      v-show="modelValue"
      class="modal"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  modelValue: Boolean
})
</script>
<style lang="scss" src="./ModalDialog.scss" />