<script setup>
defineProps({
  background: String,
  borderRadius: Number,
  disabled: Boolean,
});
</script>

<template>
  <button
    class="app-button"
    :style="{
      background,
      'border-radius': borderRadius + 'px',
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" src="./AppButton.scss" />
