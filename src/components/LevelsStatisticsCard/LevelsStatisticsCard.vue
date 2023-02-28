<template>
  <div class="levels-statistics-card">
    <slot
      name="item"
      v-bind:item="item"
    />
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  item: Object
})
</script>

<style lang="scss" src="./LevelsStatisticsCard.scss" />