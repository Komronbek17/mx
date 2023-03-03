<script setup>
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { contentApi } from "@/services/content.service";

const toast = useToast();
const policy = reactive({
  content: "",
  name: "",
});

async function fetchPolicy() {
  try {
    const response = await contentApi.policy();
    policy.name = response.data.name;
    policy.content = response.data.content;
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  }
}

fetchPolicy();
</script>

<template>
  <div class="privacy">
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
    color: #333333;
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
    color: #333333;
  }
}
</style>
