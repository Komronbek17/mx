<script setup>
import { computed, defineAsyncComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { loadingComposable } from "@/composables/loading.composable";
import { bonusApi } from "@/services/bonus.service";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import PrizeIcon from "@/components/icons/PrizeIcon.vue";
import { WebAppController } from "@/utils/telegram/web.app.util";

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
const toast = useToast();
const { t } = useI18n();

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

async function fetchPremiumBonus() {
  startLoading();
  try {
    const response = await bonusApi.fetchPremiumLampInfo();
    responseHandler(response);
    stopAnimation();
    showModal();
  } catch (e) {
    errorHandler(e);
  } finally {
    finishLoading();
    showModalApplyButton();
    showModal();
  }
}
async function setPremiumBonus() {
  startAnimation();
  try {
    const response = await bonusApi.setPremiumLampGift({
      body: {
        type: state.giftType,
      },
    });
    modalState.status = response.status;
    modalState.type = response.data.type;
    modalState.name = response.data.name;
    hideGiftsModal();
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
  modalState.message = response.data.message;
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
    modalState.message = e.response.data.message;
    e.response.data.types.forEach((type) => {
      const gift = state.giftTypesOption.find(
        (giftType) => giftType.type === type
      );
      if (gift) {
        state.gifts.push(gift);
      }
    });
    showGiftsModal();
  } else if (e.response.status === 403) {
    modalState.message = e.response.data.message;
    hideModalCancelButton();
    showModalCancelButton();
  } else {
    toast.error(e.response.data.message ?? e.message);
  }
}

function applyAction() {
  switch (modalState.status) {
    case 402: {
      setPremiumBonus();
      break;
    }
    case 406: {
      router.push({
        name: "settings-unsubscribe",
      });
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

function selectGiftHandler(type) {
  state.giftType = type;
  setPremiumBonus();
}

WebAppController.ready();
fetchPremiumBonus();
</script>

<template>
  <div>
    <app-loader :active-="isFetching" />
    <rotating-fish type="premium" :stop="state.stopAnimation" />
    <modal-dialog v-model="modalState.show" :show-close-icon="false">
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            <span v-if="isStatusSuccess">
              {{ modalState.name }}, {{ modalState.type }}
            </span>
            <span v-else>
              <span>{{ modalState.message }}</span>
            </span>
          </h3>
          <div v-if="modalState.status === 402">
            {{
              t("connect_premium_service_message", {
                price: modalState.price,
              })
            }}
          </div>
        </div>
      </template>

      <template #footer>
        <div class="modal-footer footer-actions">
          <div
            v-if="modalState.showCancelButton"
            @click="cancelAction"
            class="modal-footer__button btn-danger"
          >
            {{ $t("cancel") }}
          </div>
          <div @click="applyAction" class="modal-footer__button btn-yellow">
            {{ $t("ok") }}
          </div>
        </div>
      </template>
    </modal-dialog>

    <modal-dialog v-model="state.showGiftsModal" @close-modal="cancelAction">
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
</style>
