<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disableLeftLine: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <span
    class="flash__progress__line"
    :class="{
      active: props.active,
      disable__left__line: props.disableLeftLine,
    }"
  ></span>
</template>

<style lang="scss" scoped>
.flash__progress__line {
  position: relative;
  width: 100%;
  height: 1.25rem;
  background-color: var(--accent-gray);

  &.active {
    background-color: var(--light-gradients-blue);
  }

  &::after,
  &::before {
    content: "";
    width: 0.4rem;
    height: 1.25rem;
    position: absolute;
    background-color: inherit;
    z-index: -1;
  }

  &::after {
    right: -0.4rem;
  }

  &::before {
    left: -0.4rem;
  }
}
</style>
