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
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.125 4H20.125C21.225 4 22.125 4.9 22.125 6V18C22.125 19.1 21.225 20 20.125 20H4.125C3.025 20 2.125 19.1 2.125 18V6C2.125 4.9 3.025 4 4.125 4Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="pathStyle"
    />
    <path
      d="M22.125 6L12.125 13L2.125 6"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="pathStyle"
    />
  </svg>
</template>
