<script setup>
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
// import { useToast } from "vue-toastification";
import { loadingComposable } from "@/composables/loading.composable";
// import { bonusApi } from "@/services/bonus.service";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import PrizeIcon from "@/components/icons/PrizeIcon.vue";
// import { AmplitudeTracker } from "@/libs/amplitude/analyticsBrowser";
import { WebAppController } from "@/utils/telegram/web.app.util";
// import { subscribeApi } from "@/services/subscribe.service";
// import { useUserStore } from "@/stores/user.store";
import { bonusApiV2 } from "@/services/bonusV2.service";
import { subscribeV2Api } from "@/services/subscribeV2.service";

const InternetIconComponent = defineAsyncComponent(() => {
  return import("@/components/icons/InternetIcon.vue");
});

const MinuteIconComponent = defineAsyncComponent(() => {
  return import("@/components/icons/MinuteIcon.vue");
});

const SmsIconComponent = defineAsyncComponent(() => {
  return import("@/components/icons/SmsIcon.vue");
});

const router = useRouter();
// const toast = useToast();
const { t } = useI18n();

// const userStore = useUserStore();

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const staticNumber = ref(4);

const modalState = reactive({
  show: false,
  step: 0,
  price: 0,
  message: "",
  status: 0,
  name: "",
  types: "",
  showApplyButton: true,
  showCancelButton: false,
});

const state = reactive({
  stopAnimation: false,
  giftTypesOption: [
    {
      type: "internet",
      icon: InternetIconComponent,
      text: "internet_package",
      btnClass: "traffic-btn",
    },
    {
      type: "voice",
      icon: MinuteIconComponent,
      text: "bonus_minutes",
      btnClass: "minute-btn",
    },
    {
      type: "sms",
      icon: SmsIconComponent,
      text: "sms_package",
      btnClass: "sms-btn",
    },
  ],
  gifts: [],
  giftType: null,
  showGiftsModal: false,
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

function showGiftsModal() {
  state.showGiftsModal = true;
}

function hideGiftsModal() {
  state.showGiftsModal = false;
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

async function fetchPremiumBonus() {
  startAnimation();
  try {
    const response = await bonusApiV2.premiumAppoint({
      step: staticNumber.value,
      type: state.giftType,
    });
    modalState.status = response.data.statusCode;
    modalState.name = response?.data?.name || t("order_accept_waiting_msg");

    hideGiftsModal();
    stopAnimation();
    hideModalCancelButton();
    hideAgreementModal();
    // showModal();
  } catch (e) {
    console.error(e);
    hideGiftsModal();
    stopAnimation();
  } finally {
    showModalApplyButton();
    showModal();
  }
}

async function fetchPremiumStatus() {
  startLoading();
  try {
    const response = await bonusApiV2.premiumStatus();
    const activeBonusSteps = response.data.data.steps.filter(
      (item) => item.status !== 3
    ).length;
    staticNumber.value = staticNumber.value - activeBonusSteps;
    if (staticNumber.value < 4) {
      agreementModal.price =
        response.data.data.steps[staticNumber.value - 1]?.price;
      const keysArray = Object.keys(
        response.data.data.steps[staticNumber.value - 1].info
      );
      keysArray.forEach((item) => {
        const gift = state.giftTypesOption.find(
          (giftType) => giftType.type === item
        );
        if (gift) {
          state.gifts.push(gift);
        }
      });
    }

    if (response.data.data["is_subscriber"] === false) {
      subscriptionModal.text = t("title.subscribe");
      subscriptionModal.showCancelButton = true;
      showSubscriptionModal();
    } else if (staticNumber.value < 4) {
      await showAgreementModal();
    } else {
      modalState.name = t("all_chances_are_taken");
      modalState.message = t("all_chances_are_taken");
      showModal();
    }
    stopAnimation();
  } catch (e) {
    console.error(e);
  } finally {
    finishLoading();
    showModalApplyButton();
  }
}

async function subscribe() {
  try {
    await subscribeV2Api.activate({ subscriptionId: 1 });
  } catch (e) {
    console.error(e);
  }
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
  await showAgreementModal();
}

function cancelGiftsAction() {
  hideGiftsModal();
  router.push({
    name: "home",
  });
}

async function applyGiftsAction() {
  await hideGiftsModal();
}

function stopAnimation() {
  state.stopAnimation = true;
}

function startAnimation() {
  state.stopAnimation = false;
}

async function selectGiftHandler(type) {
  state.giftType = type;
  showModalCancelButton();
  await fetchPremiumBonus();
  await applyGiftsAction();
}

function leaveBonusPage() {
  router.push({
    name: "home",
  });
  resetFields();
}

fetchPremiumStatus();

WebAppController.ready();
</script>

<template>
  <div>
    <app-loader :active="isFetching" />
    <rotating-fish type="premium" :stop="state.stopAnimation" />

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
            {{ $t("approve") }}
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
            {{ $t("cancel") }}
          </div>
          <div @click="showGiftsModal" class="modal-footer__button btn-yellow">
            {{ $t("button.submit") }}
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

    <!--  GIFTS MODAL  -->
    <modal-dialog
      v-model="state.showGiftsModal"
      @close-modal="cancelGiftsAction"
    >
      <template #header>
        <div class="ol-gifts-modal">
          <prize-icon :size="100" />
          <span class="ol-gifts-modal-title">
            {{ $t("premium_gifts_title") }}:
          </span>
          <div class="ol-gifts-modal-buttons-group">
            <button
              class="ol-premium-button"
              v-for="gift in state.gifts"
              :key="gift.text"
              :class="gift.btnClass"
              @click="selectGiftHandler(gift.type)"
            >
              <component :is="gift.icon" />
              <span class="button-text">{{ t(gift.text) }}</span>
            </button>
          </div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<style lang="scss" scoped>
//::v-deep .modal {
//  background: var(--gf-bg-main);
//}

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

.ol-gifts-modal {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &-title {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: var(--gf-text-09);
  }
}

.ol-gifts-modal-buttons-group {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  width: 100%;
}

.ol-premium-button {
  outline-color: transparent;
  display: flex;
  align-items: center;
  color: var(--gf-text-09);
  column-gap: 1rem;
  border-radius: 8px;
  width: 100%;
  padding: 1rem;

  .button-text {
    color: var(--gf-text-white-2x);
    font-weight: 600;
    font-size: 15px;
  }
}

.traffic-btn {
  background: var(--gf-blue-gradient-02);
}

.minute-btn {
  background: var(--gf-yellow-gradient);
}

.sms-btn {
  background: var(--gf-green-gradient);
}

.testoviy {
  z-index: 123123123 !important;
}
</style>
