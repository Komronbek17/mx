<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 32,
  },
  fill: {
    type: String,
    default: "var(--text-secondary)",
  },
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6588 28H13.3255L14.6588 18.6667H9.99215C8.81882 18.6667 9.55215 17.6667 9.57882 17.6267C11.2988 14.5867 13.8855 10.0533 17.3388 4H18.6721L17.3388 13.3333H22.0188C22.5522 13.3333 22.8455 13.5867 22.5521 14.2133C17.2855 23.4 14.6588 28 14.6588 28Z"
      :fill="props.fill"
    />
  </svg>
</template>
