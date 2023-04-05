<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

import AppLoader from "@/components/elements/loader/AppLoader.vue";

import {subscribeApi} from "@/services/subscribe.service";
import {WebAppController} from "@/utils/telegram/web.app.util";
import {loadingComposable} from "@/composables/loading.composable";

const {t} = useI18n();
const isSubscribed = ref(null);
const router = useRouter();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const getStatus = async () => {
  startLoading();
  try {
    const response = await subscribeApi.fetchStatus();
    isSubscribed.value = response.data.isSubscribed;
  } finally {
    finishLoading();
  }
};

async function toggleSubscribing() {
  if (isSubscribed.value === true) {
    await subscribeApi
        .subscribeStop()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          router.push({name: "settings"});
        });
  } else {
    await subscribeApi
        .subscribeActivate()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          router.push({name: "settings"});
        });
  }
}

function backToSettings() {
  router.push({name: "settings"});
}

onMounted(async () => {
  await getStatus();
});

WebAppController.ready();
</script>

<template>
  <div class="unsubscribe">
    <app-loader :active="isFetching"/>
    <div class="layout-container">
      <div class="unsubscribe-block">
        <div class="unsubscribe-image">
          <img src="@/assets/images/message-icon.svg" alt=""/>
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
    color: var(--gf-text-09);
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
    background: #f2fbfd;
    border-radius: 8px;
    margin-right: 1rem;
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: #090909;
  }

  &-btn__yes {
    background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #fff;
  }
}
</style>
