<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <span class="flash__progress__circle" :class="{ active: props.active }">
    <slot name="icon" />
  </span>
</template>

<style lang="scss" scoped>
.flash__progress__circle {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: var(--accent-gray);
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background-color: var(--light-gradients-blue);
  }
}
</style>
