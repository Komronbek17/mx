<template>
  <div class="progress-line">
    <div class="progress-line__bar">
      <div
        class="progress-line__value"
        :style="{width: value + '%'}"
      />
    </div>
    <p class="progress-line__percentage">
      {{ value }}%
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  value: [String, Number]
})
</script>

<style lang="scss" src="./ProgressLine.scss"/>