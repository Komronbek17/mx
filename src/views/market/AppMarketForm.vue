<script setup>
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { coinApi } from "@/services/coin.service";
import { onMounted, ref } from "vue";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

const form = ref({
  address: null,
  entrance: null,
  floor: null,
  flat: null,
  comment: null,
});

const { t } = useI18n();
const toast = useToast();
const addresses = ref([]);
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();
const createAddress = async () => {
  try {
    await coinApi
      .addressFindAll({ params: { page: 1, limit: 10 } })
      .then((response) => {
        console.log(response);
        addresses.value = response.data.result;
      });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};

onMounted(async () => {
  startLoading();
  try {
    // await getAddresses();
  } finally {
    finishLoading();
  }
});
</script>

<template>
  <div class="market-form">
    <div class="layout-container">
      <app-loader :active="isFetching" />
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
