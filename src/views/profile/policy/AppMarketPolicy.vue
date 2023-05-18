<script setup>
import { onMounted, reactive } from "vue";
import { policyApi } from "@/services/policy";
import { toastErrorMessage } from "@/utils/error.util";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { localStorageController } from "@/utils/localstorage.util";
import { MARKET_POLICY_VIEWED } from "@/constants";

const policy = reactive({
  content: "",
  name: "",
});

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

async function fetchPolicy() {
  startLoading();
  try {
    const response = await policyApi.marketPolicy();
    console.log("response", response.data);
    policy.name = response.data.result.title;
    policy.content = response.data.result.content;
  } catch (e) {
    toastErrorMessage(e);
  } finally {
    finishLoading();
  }
}

onMounted(() => {
  localStorageController.set(MARKET_POLICY_VIEWED, true);
});

WebAppController.ready();
fetchPolicy();
</script>

<template>
  <div class="privacy">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <p class="privacy-title">{{ policy.name }}</p>
      <div class="privacy-description" v-html="policy.content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.privacy {
  &-title {
    letter-spacing: -0.32px;
    color: var(--text-main);
    text-align: center;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    @extend .text-15-600;
  }

  &-description {
    @extend .text-14-400;
    color: var(--text-main);
  }
}
</style>
