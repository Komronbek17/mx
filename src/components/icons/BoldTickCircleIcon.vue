<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  fill: {
    type: String,
    default: "var(--star-color0)",
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
      d="M10.875 0C5.365 0 0.875 4.49 0.875 10C0.875 15.51 5.365 20 10.875 20C16.385 20 20.875 15.51 20.875 10C20.875 4.49 16.385 0 10.875 0ZM15.655 7.7L9.985 13.37C9.845 13.51 9.655 13.59 9.455 13.59C9.255 13.59 9.065 13.51 8.925 13.37L6.095 10.54C5.805 10.25 5.805 9.77 6.095 9.48C6.385 9.19 6.865 9.19 7.155 9.48L9.455 11.78L14.595 6.64C14.885 6.35 15.365 6.35 15.655 6.64C15.945 6.93 15.945 7.4 15.655 7.7Z"
      :fill="props.fill"
    />
  </svg>
</template>
