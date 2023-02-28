<script setup>
defineProps({
  value: [String, Number],
});
</script>

<template>
  <div class="progress-line">
    <div class="progress-line__bar">
      <div class="progress-line__value" :style="{ width: value + '%' }" />
    </div>
    <p class="progress-line__percentage">{{ value }}%</p>
  </div>
</template>

<style lang="scss" src="./ProgressLine.scss" />
