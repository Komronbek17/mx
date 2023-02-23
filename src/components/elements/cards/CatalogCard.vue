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
  background-color: var(--gf-p-accent);
  border-radius: 8px;
  width: 100px;
  height: 100px;
  color: var(--gf-p-primary-color);
  text-decoration: none;
  &-content {
    line-height: 20px;
    font-weight: 600;
  }
}
</style>
