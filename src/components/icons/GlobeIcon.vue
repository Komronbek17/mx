<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  fill: {
    type: String,
    default: "var(--text-main)",
  },
});

const pathStyle = {
  stroke: props.fill,
};
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.375 22C17.8978 22 22.375 17.5228 22.375 12C22.375 6.47715 17.8978 2 12.375 2C6.85215 2 2.375 6.47715 2.375 12C2.375 17.5228 6.85215 22 12.375 22Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="pathStyle"
    />
    <path
      d="M2.375 12H22.375"
      :style="pathStyle"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.375 2C14.8763 4.73835 16.2978 8.29203 16.375 12C16.2978 15.708 14.8763 19.2616 12.375 22C9.87372 19.2616 8.45225 15.708 8.375 12C8.45225 8.29203 9.87372 4.73835 12.375 2Z"
      :style="pathStyle"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
