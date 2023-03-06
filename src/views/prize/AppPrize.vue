<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBonus } from "@/composables/useBonus";
import { WebAppController } from "@/utils/telegram/web.app.util";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialogRotatingFish from "@/components/outdated/ModalDialogRotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import { loadingComposable } from "@/composables/loading.composable";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const showModal = true;

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const {
  getDailyBonus,
  resetValues,
  statusCode,
  isDialogOpen,
  dailyResponse,
  isSubmitBtnAvailable,
  isAbortBtnAvailable,
} = useBonus();

async function submit() {
  if (statusCode.value === 402) {
    return await getDailyBonus("post");
  }

  if (statusCode.value === 406) {
    return router.push({ name: "Settings" });
  }

  await router.push({ name: "Home" });
  resetValues();
}

function abort() {
  isDialogOpen.value = false;
  router.push({ name: "Home" });
  resetValues();
}

onMounted(async () => {
  startLoading();
  try {
    await getDailyBonus("get");
  } finally {
    finishLoading();
  }
});

WebAppController.ready();
</script>

<template>
  <div class="daily">
    <app-loader :active="isFetching" />
    <rotating-fish :stop="isDialogOpen" />

    <modal-dialog v-model="showModal">
      <template #header>
        <h2 class="getting-bonus-dialog__title">
          <template v-if="statusCode === 200">
            {{ dailyResponse.name }} {{ dailyResponse.type }}
          </template>
          <template v-else>
            {{ dailyResponse.message }}
          </template>
        </h2>
      </template>

      <template #footer>
        <button>{{ t("ok") }}</button>
        <button>{{ t("cancel") }}</button>
      </template>
    </modal-dialog>

    <modal-dialog-rotating-fish
      v-model="isDialogOpen"
      :submit-btn="isSubmitBtnAvailable"
      :abort-btn="isAbortBtnAvailable"
      @submit="submit"
      @abort="abort"
    >
      <h2 class="getting-bonus-dialog__title">
        <template v-if="statusCode === 200">
          {{ dailyResponse.name }} {{ dailyResponse.type }}
        </template>
        <template v-else>
          {{ dailyResponse.message }}
        </template>
      </h2>
    </modal-dialog-rotating-fish>
  </div>
</template>
