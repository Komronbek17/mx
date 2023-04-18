<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  fill: {
    type: String,
    default: "#00AEE8",
  },
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 5L10.5 10M10.5 10L15 15M10.5 10L15 5M10.5 10L6 15"
      :stroke="props.fill"
      :stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
