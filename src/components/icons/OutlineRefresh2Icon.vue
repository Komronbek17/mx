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
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M18.3334 9.99984C18.3334 14.5998 14.6 18.3332 10 18.3332C5.40002 18.3332 2.59169 13.6998 2.59169 13.6998M2.59169 13.6998H6.35835M2.59169 13.6998V17.8665M1.66669 9.99984C1.66669 5.39984 5.36669 1.6665 10 1.6665C15.5584 1.6665 18.3334 6.29984 18.3334 6.29984M18.3334 6.29984V2.13317M18.3334 6.29984H14.6334"
      :stroke="props.fill"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
