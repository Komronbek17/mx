<script setup>
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { contentApi } from "@/services/content.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";

const toast = useToast();
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
    const response = await contentApi.policy();
    policy.name = response.data.name;
    policy.content = response.data.content;
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishLoading();
  }
}

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
    color: var(--gf-text-33);
    text-align: center;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }

  &-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: var(--gf-text-33);
  }
}
</style>
