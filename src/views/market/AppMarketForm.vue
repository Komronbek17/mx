<script setup>
import { ref } from "vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";

const form = ref({
  address: null,
  entrance: null,
  floor: null,
  flat: null,
  comment: null,
});
</script>

<template>
  <div class="market-form">
    <div class="layout-container">
      <div class="market-form__block">
        <!--      -->
        <BaseInput
          v-model="form.address"
          :name="'address'"
          :label="'Ваш адрес'"
        />

        <BaseInput
          v-model="form.entrance"
          :name="'entrance'"
          :label="'Подъезд'"
        />

        <BaseInput v-model="form.floor" :name="'floor'" :label="'Этаж'" />

        <BaseInput v-model="form.flat" :name="'flat'" :label="'Квартира'" />

        <BaseInput
          v-model="form.comment"
          :name="'comment'"
          :label="'Комментарий'"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.market-form {
  &__block {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}
</style>
