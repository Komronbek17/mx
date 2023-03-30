<script setup>
import { ref } from "vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";

const form = ref({
  date: null,
  receiver: null,
  comment: null,
});
</script>

<template>
  <div class="market-details">
    <div class="layout-container">
      <div class="market-details__block">
        <BaseInput v-model="form.date" name="date" type="date" label="Дата" />

        <BaseInput v-model="form.receiver" name="receiver" label="Получатель" />

        <BaseInput v-model="form.comment" name="comment" label="Комментарий" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep input[type="date"]::-webkit-inner-spin-button,
::v-deep input[type="date"]::-webkit-calendar-picker-indicator {
  background-color: var(--text-main);
  border-radius: 4px;
}

.market-details {
  &__block {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}
</style>
