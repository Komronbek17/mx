<script setup>
defineProps({
  modelValue: Boolean,
});
</script>

<template>
  <transition name="modal">
    <div v-show="modelValue" class="modal">
      <slot />
    </div>
  </transition>
</template>
<style lang="scss" src="./ModalDialog.scss" />
