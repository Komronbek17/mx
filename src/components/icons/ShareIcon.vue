<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
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
      d="M12.9999 11.7502C12.8099 11.7502 12.6199 11.6802 12.4699 11.5302C12.1799 11.2402 12.1799 10.7602 12.4699 10.4702L20.6699 2.27023C20.9599 1.98023 21.4399 1.98023 21.7299 2.27023C22.0199 2.56023 22.0199 3.04023 21.7299 3.33023L13.5299 11.5302C13.3799 11.6802 13.1899 11.7502 12.9999 11.7502Z"
      :fill="color"
    />
    <path
      d="M22 7.55C21.59 7.55 21.25 7.21 21.25 6.8V2.75H17.2C16.79 2.75 16.45 2.41 16.45 2C16.45 1.59 16.79 1.25 17.2 1.25H22C22.41 1.25 22.75 1.59 22.75 2V6.8C22.75 7.21 22.41 7.55 22 7.55Z"
      :fill="color"
    />
    <path
      d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
      :fill="color"
    />
    <defs>
      <linearGradient
        id="paint0_linear_331_1757"
        x1="12.2524"
        y1="2.05273"
        x2="19.9981"
        y2="13.1151"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#7243A0" />
        <stop offset="1" stop-color="#9530EB" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_331_1757"
        x1="16.45"
        y1="1.25"
        x2="21.4815"
        y2="8.43791"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#7243A0" />
        <stop offset="1" stop-color="#9530EB" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_331_1757"
        x1="1.25"
        y1="1.25"
        x2="18.4212"
        y2="25.7802"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#7243A0" />
        <stop offset="1" stop-color="#9530EB" />
      </linearGradient>
    </defs>
  </svg>
</template>
