<script setup>
import { ref } from "vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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
        <BaseInput
          v-model="form.address"
          :name="'address'"
          :label="t('market_page.form.address')"
        />

        <BaseInput
          v-model="form.entrance"
          :name="'entrance'"
          :label="t('market_page.form.entrance')"
        />

        <BaseInput
          v-model="form.floor"
          :name="'floor'"
          :label="t('market_page.form.floor')"
        />

        <BaseInput
          v-model="form.flat"
          :name="'flat'"
          :label="t('market_page.form.flat')"
        />

        <BaseInput
          v-model="form.comment"
          :name="'comment'"
          :label="t('market_page.form.comment')"
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
