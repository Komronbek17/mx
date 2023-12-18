<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import { subscribeV2Api } from "@/services/subscribeV2.service";
import {useToast} from "vue-toastification";

const { t } = useI18n();
const isSubscribed = ref(null);
const router = useRouter();
const toast = useToast()

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const getStatus = async () => {
  startLoading();
  try {
    const response = await subscribeV2Api.status();
    isSubscribed.value = response.data.data.is_subscriber;
  } finally {
    finishLoading();
  }
};

async function toggleSubscribing() {
  if (isSubscribed.value === true) {
    await subscribeV2Api
      .deactivate()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        toast.error(e.response.data.message ?? e.message);
      })
      .finally(() => {
        router.push({ name: "settings" });
      });
  } else {
    await subscribeV2Api
      .activate({ subscriptionId: 1 })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        toast.error(e.response.data.message ?? e.message);
      })
      .finally(() => {
        router.push({ name: "settings" });
      });
  }
}

function backToSettings() {
  router.push({ name: "settings" });
}

onMounted(async () => {
  await getStatus();
});

WebAppController.ready();
</script>

<template>
  <div class="unsubscribe">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div class="unsubscribe-block">
        <div class="unsubscribe-image">
          <img src="@/assets/images/message-icon.svg" alt="" />
        </div>

        <p v-if="isSubscribed" class="unsubscribe-title">
          {{ t("settings_page.unsubscribe_msg") }}
        </p>
        <p v-else class="unsubscribe-title">
          {{ t("settings_page.subscribe_msg") }}
        </p>
        <div class="unsubscribe-btns">
          <button class="unsubscribe-btn__no" @click="backToSettings">
            {{ t("no") }}
          </button>
          <button
            class="unsubscribe-btn__yes"
            @click.prevent="toggleSubscribing"
          >
            {{ t("yes") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.unsubscribe {
  &-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-image {
    width: 32px;
    height: 32px;
    margin-bottom: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-title {
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: var(--text-main);
    margin-bottom: 1rem;
  }

  &-btns {
    display: flex;
    align-items: center;
    justify-content: center;

    & button {
      width: 60px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
  }

  &-btn__no {
    background: var(--accent-gray);
    border-radius: 8px;
    margin-right: 1rem;
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: var(--text-main);
  }

  &-btn__yes {
    background: var(--gradient-purple);
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #fff;
  }
}
</style>
