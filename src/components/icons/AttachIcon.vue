<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  fill: {
    type: String,
    default: "#333333",
  },
});
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
      d="M5.58054 10.4943L11.5553 4.42856C16.8991 -0.915013 24.9147 7.10034 19.571 12.4439L11.8519 20.1582C8.28936 23.7206 2.94559 18.377 6.50811 14.8146L14.2272 7.10034C15.9952 5.37602 18.6642 8.0857 17.1956 9.77213L9.81171 17.2685"
      :stroke="props.fill"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
