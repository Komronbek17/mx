<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import RotatingFish from "@/components/outdated/RotatingFish.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";

import { bonusApi } from "@/services/bonus.service";

const router = useRouter();
const toast = useToast();

const modalState = reactive({
  show: true,
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

function showModal() {
  modalState.show = true;
}

function hideModal() {
  modalState.show = false;
}

async function fetchDailyBonus() {
  try {
    const response = await bonusApi.fetchDailyLamp();
    modalState.status = response.status;
    modalState.type = response.data.type;
    modalState.name = response.data.name;

    showModal();
  } catch (e) {
    modalState.status = e.response.status;
    modalState.message = e.response.data.message;

    if (e.response.status === 402) {
      modalState.step = e.response.data.step;
      modalState.price = e.response.data.price;
    } else {
      toast.error(e.response.data.message ?? e.message);
    }
  }
}

async function setDailyBonus() {}

/*
* async function submit () {
  if(statusCode.value === 402) return await getDailyBonus('post')
  if(statusCode.value === 406) return router.push({name: 'Settings'})

  await router.push({name: 'Home'})
  resetValues()
}
* */

function applyAction() {
  switch (modalState.status) {
    case 402: {
      setDailyBonus();
      break;
    }
    case 406: {
      router.push({
        name: "settings",
      });
      break;
    }
    default: {
      router.push({
        name: "home",
      });
    }
  }
}

function cancelAction() {
  hideModal();
}

onMounted(() => {
  fetchDailyBonus();
});
</script>

<template>
  <div>
    <rotating-fish :stop="state.stopAnimation" />
    <modal-dialog v-model="modalState.show" :show-close-icon="false">
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            <span v-if="isStatusSuccess">
              {{ modalState.name }} , {{ modalState.type }}
            </span>
            <span v-else>
              {{ modalState.message }}
            </span>
          </h3>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer footer-actions">
          <div @click="cancelAction" class="modal-footer__button btn-danger">
            {{ $t("cancel") }}
          </div>
          <div @click="applyAction" class="modal-footer__button btn-yellow">
            {{ $t("ok") }}
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
    padding-right: 1rem;
    padding-left: 1rem;
    width: 100%;
  }
}
</style>
