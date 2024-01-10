<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 30,
  },
  fill: {
    type: String,
    default: "#FACC15",
  },
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2644 26.3533H13.0561L14.2644 17.8949H10.0352C8.97191 17.8949 9.63649 16.9887 9.66066 16.9524C11.2194 14.1974 13.5636 10.0891 16.6932 4.60327H17.9015L16.6932 13.0616H20.9344C21.4177 13.0616 21.6836 13.2912 21.4177 13.8591C16.6448 22.1845 14.2644 26.3533 14.2644 26.3533Z"
      :fill="props.fill"
    />
  </svg>
</template>
