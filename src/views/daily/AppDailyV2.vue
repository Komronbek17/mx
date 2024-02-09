<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

// import { bonusApi } from "@/services/bonus.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
// import { subscribeApi } from "@/services/subscribe.service";
import { useI18n } from "vue-i18n";
import { bonusApiV2 } from "@/services/bonusV2.service";
import { subscribeV2Api } from "@/services/subscribeV2.service";

const router = useRouter();
const toast = useToast();

const { t } = useI18n();

const staticNumber = ref(4);

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

const subscriptionModal = reactive({
  show: false,
  text: "",
  showApplyButton: true,
  showCancelButton: true,
});

const agreementModal = reactive({
  price: null,
  show: false,
  showApplyButton: true,
  showCancelButton: true,
});

const isStatusSuccess = computed(() => modalState.status === 200);
const isForbidden = computed(() => modalState.status === 403);

function hideModalCancelButton() {
  modalState.showCancelButton = false;
}

// function showModalCancelButton() {
//   modalState.showCancelButton = true;
// }

function showModalApplyButton() {
  modalState.showApplyButton = true;
}

function showModal() {
  modalState.show = true;
}

function hideModal() {
  modalState.show = false;
}

function showSubscriptionModal() {
  subscriptionModal.show = true;
}

function hideSubscriptionModal() {
  subscriptionModal.show = false;
}

function showAgreementModal() {
  agreementModal.show = true;
}

function hideAgreementModal() {
  agreementModal.show = false;
}

const getDailyBonus = async () => {
  startAnimation();
  try {
    showModal();
    const { data } = await bonusApiV2.dailyAppoint({
      step: staticNumber.value,
      service: "web_app",
    });
    responseHandler(data);
  } catch (e) {
    errorHandler(e);
    showModalApplyButton();
    showModal();
  } finally {
    stopAnimation();
    hideAgreementModal();
    showModal();
  }
};

const getDailyInfo = async () => {
  try {
    const { data } = await bonusApiV2.dailyStatus();
    const activeBonusSteps = data.data.steps.filter(
      (item) => item.status !== 3
    ).length;
    staticNumber.value = staticNumber.value - activeBonusSteps;
    agreementModal.price = data.data.steps[staticNumber.value - 1]?.price;
    if (!data.data["is_subscriber"]) {
      subscriptionModal.text = t("title.subscribe");
      subscriptionModal.showCancelButton = true;
      showSubscriptionModal();
    } else if (staticNumber.value === 1) {
      await getDailyBonus();
    } else if (staticNumber.value < 4 && staticNumber.value > 1) {
      await showAgreementModal();
    } else {
      modalState.message = t("all_chances_are_taken");
      showModal();
    }
  } catch (e) {
    console.error(e);
  }
};

async function subscribe() {
  try {
    await subscribeV2Api.activate({ subscriptionId: 1 });
  } catch (e) {
    console.error(e);
  }
}

function responseHandler(response) {
  modalState.name = response.message || t("order_accept_waiting_msg");
  modalState.status = response.statusCode;
}

function errorHandler(e) {
  modalState.status = e.response.status;
  modalState.message = e.response.data.message;
  toast.error(e.response.data.message ?? e.message);
}

function leaveBonusPage() {
  router.push({
    name: "home",
  });
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

function cancelSubscriptionAction() {
  hideSubscriptionModal();
  subscriptionModal.text = "";
  router.push({
    name: "home",
  });
}

async function applySubscriptionAction() {
  await subscribe();
  await hideSubscriptionModal();
  // await getDailyBonus();
  await showAgreementModal();
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
      await getDailyInfo();
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

    <!--  IN PROCESS MODAL  -->
    <modal-dialog v-model="modalState.show" :show-close-icon="false">
      <template #header>
        <img v-if="isStatusSuccess" src="@/assets/icons/sms.svg" alt="" />
        <img v-else src="@/assets/icons/daily.svg" alt="" />
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            <span v-if="isStatusSuccess">
              {{ modalState.name }}
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
          <div @click="leaveBonusPage" class="modal-footer__button btn-yellow">
            <!--            <template v-if="isStatusSuccess || isForbidden">-->
            {{ $t("approve") }}
            <!--            </template>-->
            <!--            <template v-else>-->
            <!--            {{ $t("ok") }}-->
            <!--            </template>-->
          </div>
        </div>
      </template>
    </modal-dialog>

    <!--  AGREEMENT MODAL  -->
    <modal-dialog v-model="agreementModal.show" :show-close-icon="false">
      <template #header>
        <img src="@/assets/icons/daily.svg" alt="" />
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            <span v-if="agreementModal.price">
              {{ $t("modal_text_price", { price: agreementModal.price }) }}
            </span>
          </h3>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer footer-actions">
          <div
            v-if="agreementModal.showCancelButton"
            @click="cancelAction"
            class="modal-footer__button btn-danger"
          >
            {{ $t("no") }}
          </div>
          <div @click="getDailyBonus" class="modal-footer__button btn-yellow">
            {{ $t("approve") }}
          </div>
        </div>
      </template>
    </modal-dialog>

    <!--  SUBSCRIPTION MODAL  -->
    <modal-dialog v-model="subscriptionModal.show" :show-close-icon="false">
      <template #header>
        <img src="@/assets/icons/sms.svg" alt="" />
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            <span>
              {{ subscriptionModal.text }}
            </span>
          </h3>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer footer-actions">
          <div
            v-if="subscriptionModal.showCancelButton"
            @click="cancelSubscriptionAction"
            class="modal-footer__button btn-danger"
          >
            {{ $t("no") }}
          </div>
          <div
            @click="applySubscriptionAction"
            class="modal-footer__button btn-yellow"
          >
            {{ $t("button.submit") }}
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
