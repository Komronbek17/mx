<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

import { bonusApi } from "@/services/bonus.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import { subscribeApi } from "@/services/subscribe.service";

const router = useRouter();
const toast = useToast();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const modalState = reactive({
  show: false,
  step: 0,
  price: 0,
  message: "",
  status: 0,
  name: "",
  type: "",
  showApplyButton: true,
  showCancelButton: false,
});

const state = reactive({
  stopAnimation: false,
});

const isStatusSuccess = computed(() => modalState.status === 200);

function hideModalCancelButton() {
  modalState.showCancelButton = false;
}

function showModalCancelButton() {
  modalState.showCancelButton = true;
}

function showModalApplyButton() {
  modalState.showApplyButton = true;
}

function showModal() {
  modalState.show = true;
}

function hideModal() {
  modalState.show = false;
}

async function fetchDailyBonus() {
  try {
    const response = await bonusApi.fetchDailyLamp();
    responseHandler(response);
    stopAnimation();
    showModal();
  } catch (e) {
    errorHandler(e);
  } finally {
    showModalApplyButton();
    showModal();
  }
}
async function setDailyBonus() {
  startAnimation();
  try {
    const response = await bonusApi.setDailyGift();
    responseHandler(response);
    stopAnimation();
    showModal();
  } catch (e) {
    errorHandler(e);
  } finally {
    showModalApplyButton();
    showModal();
  }
}

function responseHandler(response) {
  modalState.status = response.status;
  modalState.type = response.data.type;
  modalState.name = response.data.name;
}

function errorHandler(e) {
  modalState.status = e.response.status;
  modalState.message = e.response.data.message;

  if (e.response.status === 402) {
    modalState.step = e.response.data.step;
    modalState.price = e.response.data.price;
  } else {
    toast.error(e.response.data.message ?? e.message);
  }

  showModalCancelButton();
}

async function switchSubscribe() {
  await resetFields();
  await subscribeApi
    .subscribeActivate()
    .then(async () => {
      // console.log(modalState,'log')
      await fetchDailyBonus();
    })
    .catch((e) => {
      toast.error(e.response.data.message ?? e.message);
    });
}

function applyAction() {
  switch (modalState.status) {
    case 402: {
      setDailyBonus();
      break;
    }
    case 406: {
      switchSubscribe();
      // router.push({
      //   name: "settings-unsubscribe",
      // });
      break;
    }
    default: {
      router.push({
        name: "home",
      });
    }
  }

  resetFields();
}

function resetFields() {
  state.stopAnimation = false;

  modalState.step = 0;
  modalState.price = 0;
  modalState.status = 0;
  modalState.name = "";
  modalState.type = "";
  modalState.message = "";
  modalState.show = false;
  hideModalCancelButton();
  modalState.showApplyButton = false;
  modalState.showCancelButton = false;
}

function cancelAction() {
  hideModal();
  resetFields();
  router.push({
    name: "home",
  });
}

function stopAnimation() {
  state.stopAnimation = true;
}

function startAnimation() {
  state.stopAnimation = false;
}

onMounted(() => {
  setTimeout(async () => {
    startLoading();
    try {
      await fetchDailyBonus();
    } finally {
      finishLoading();
    }
  }, 2000);
});

WebAppController.ready();
</script>

<template>
  <div>
    <app-loader :active="isFetching" />
    <rotating-fish :stop="state.stopAnimation" />
    <modal-dialog v-model="modalState.show" :show-close-icon="false">
      <template #header>
        <img v-if="isStatusSuccess" src="@/assets/icons/sms.svg" alt="" />
        <img v-else src="@/assets/icons/daily.svg" alt="" />
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            <span v-if="isStatusSuccess">
              {{ modalState.name }}, {{ modalState.type }}
            </span>
            <span v-else>
              {{ modalState.message }}
            </span>
          </h3>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer footer-actions">
          <div
            v-if="modalState.showCancelButton"
            @click="cancelAction"
            class="modal-footer__button btn-danger"
          >
            {{ $t("no") }}
          </div>
          <div @click="applyAction" class="modal-footer__button btn-yellow">
            <template v-if="isStatusSuccess">
              {{ $t("approve") }}
            </template>
            <template v-else>
              {{ $t("ok") }}
            </template>
          </div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<style lang="scss" scoped>
.footer-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap: 1rem;

  .modal-footer__button {
    width: 100%;
    max-width: 200px;
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
