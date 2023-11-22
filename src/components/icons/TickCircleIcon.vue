<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  fill: {
    type: String,
    default: "#FFFFFF",
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
      d="M12.833 2C7.32301 2 2.83301 6.49 2.83301 12C2.83301 17.51 7.32301 22 12.833 22C18.343 22 22.833 17.51 22.833 12C22.833 6.49 18.343 2 12.833 2ZM17.613 9.7L11.943 15.37C11.803 15.51 11.613 15.59 11.413 15.59C11.213 15.59 11.023 15.51 10.883 15.37L8.05301 12.54C7.76301 12.25 7.76301 11.77 8.05301 11.48C8.34301 11.19 8.82301 11.19 9.11301 11.48L11.413 13.78L16.553 8.64C16.843 8.35 17.323 8.35 17.613 8.64C17.903 8.93 17.903 9.4 17.613 9.7Z"
      :fill="props.fill"
    />
  </svg>

  <!--  <svg-->
  <!--    :width="props.size"-->
  <!--    :height="props.size"-->
  <!--    viewBox="0 0 24 24"-->
  <!--    fill="none"-->
  <!--    xmlns="http://www.w3.org/2000/svg"-->
  <!--  >-->
  <!--    <path-->
  <!--      d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"-->
  <!--      fill="url(#paint0_linear_229_6351)"-->
  <!--    />-->
  <!--    <defs>-->
  <!--      <linearGradient-->
  <!--        id="paint0_linear_229_6351"-->
  <!--        x1="-1.4"-->
  <!--        y1="-1.77193"-->
  <!--        x2="20.3767"-->
  <!--        y2="26.8503"-->
  <!--        gradientUnits="userSpaceOnUse"-->
  <!--      >-->
  <!--        <stop offset="1" :stop-color="props.stopColors[0]" />-->
  <!--        <stop offset="1" :stop-color="props.stopColors[1]" />-->
  <!--      </linearGradient>-->
  <!--    </defs>-->
  <!--  </svg>-->
</template>
