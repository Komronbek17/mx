<template>
  <button
    class="app-button"
    :style="{
      background,
      'border-radius': borderRadius + 'px'
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  background: String,
  borderRadius: Number,
  disabled: Boolean
})
</script>

<style lang="scss" src="./AppButton.scss"/>