<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBonus } from "@/composables/useBonus";

import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialogRotatingFish from "@/components/outdated/ModalDialogRotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";

const router = useRouter();

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
  await getDailyBonus("get");
});

const showModal = true;
</script>

<template>
  <div class="daily">
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
        <button>ok</button>
        <button>cancel</button>
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
