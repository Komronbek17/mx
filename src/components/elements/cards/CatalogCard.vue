<script setup>
defineProps({
  to: {
    type: Object,
    default: () => {
      return {
        name: "home",
      };
    },
  },
});
</script>

<template>
  <router-link
    :to="to"
    class="flex flex-column align-center justify-center row-gap-1 ol-catalog-card"
  >
    <span>
      <slot name="icon" />
    </span>
    <span class="ol-catalog-card-content">
      <slot name="content" />
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
.ol-catalog-card {
  background-color: var(--accent-gray);
  border-radius: 8px;
  //min-width: 100px;
  //min-height: 100px;
  padding: 1rem 0;
  //flex-grow: 1;
  color: var(--text-main);
  text-decoration: none;
  &-content {
    @extend .text-15-600;
  }
}
</style>
