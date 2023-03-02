<script setup>
import { onMounted, reactive, watch } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import * as yup from "yup";

import RotateLeftIcon from "@/components/icons/RotateLeftIcon.vue";

import {
  getSessionStorageVariable,
  localStorageController,
  sessionStorageController,
} from "@/utils/localstorage.util";

import { authApi } from "@/services/auth.service";
import { OLTIN_BALIQ_BOT_TKN, VERIFICATION_PHONE } from "@/constants";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

const router = useRouter();
const toast = useToast();
const LIMIT = 60;
const verifyState = reactive({
  phone: "",
  time: {
    min: "00",
    sec: LIMIT,
  },
  showResendButton: false,
});

const {
  value: olVerifyCode,
  meta,
  errors,
  validate,
} = useField(
  "ol-verify-code",
  yup.string().required().min(4).label("Verification code")
);

watch(
  () => meta.valid,
  (valid) => {
    if (valid) {
      MainButtonController.run();
      MainButtonController.resetButtonDesign();
    } else {
      MainButtonController.setBackgroundColor("#CCE7FF");
    }
  }
);

function setPhoneNumber() {
  const vp = sessionStorageController.get(VERIFICATION_PHONE);
  if (vp) {
    verifyState.phone =
      "+" +
      vp.slice(0, 3) +
      " " +
      vp.slice(3, 5) +
      " " +
      vp.slice(5, 8) +
      " " +
      vp.slice(8, 10) +
      " " +
      vp.slice(10);
  } else {
    router.push({
      name: "login",
    });
  }
}

async function verifyCode() {
  const { valid } = await validate();
  if (valid) {
    MainButtonController.showProgress();
    try {
      const response = await authApi.verify({
        body: {
          phone: getSessionStorageVariable(VERIFICATION_PHONE),
          verify_code: olVerifyCode.value,
        },
      });

      sessionStorageController.remove(VERIFICATION_PHONE);
      localStorageController.set(
        OLTIN_BALIQ_BOT_TKN,
        response.data["access_token"]
      );

      MainButtonController.hideProgress();

      await router.push({
        name: "home",
      });
    } catch (e) {
      toast.error(e.response.data.message ?? e.message);
    } finally {
      MainButtonController.hideProgress();
    }
  }
}

function setTime({ sec, min }) {
  if (sec >= 0) {
    verifyState.time.sec = sec > 10 ? sec : `0${sec}`;
  }

  if (min >= 0) {
    verifyState.time.min = min > 10 ? min : `0${min}`;
  }
}

async function resend() {
  setTime({ sec: LIMIT });
  try {
    await authApi.login({
      body: { phone: sessionStorageController.get(VERIFICATION_PHONE) },
    });
    startTimer();
  } catch (e) {
    toast.error(e.response.data.message ?? e.message);
  }
}

function startTimer() {
  let seconds = LIMIT;
  verifyState.showResendButton = false;
  const timeInterval = setInterval(() => {
    if (seconds > 1) {
      --seconds;
      setTime({ sec: seconds });
    } else {
      clearInterval(timeInterval);
      verifyState.showResendButton = true;
    }
  }, 1000);
}

onMounted(() => {
  startTimer();
  setPhoneNumber();
});

MainButtonController.run();
MainButtonController.onClick(verifyCode);
MainButtonController.setText("Подтвердить");
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(verifyCode);
});
</script>

<template>
  <div class="ol-signin-content container">
    <h3 class="verification-phone">{{ verifyState.phone }}</h3>
    <p class="ol-signin-content-suggestion mt-1 mb-075">
      На ваш номер был отправлен SMS с кодом активации
    </p>

    <label for="ol-verification-code" class="mb-0-5 ol-phone-number-label">
      Введите код:
    </label>
    <input
      class="ol-phone-input"
      type="text"
      v-mask="'########'"
      id="ol-verification-code"
      placeholder="Код"
      v-model="olVerifyCode"
    />
    <span v-if="errors.length" class="validation-failed">
      {{ errors[0] }}
    </span>
    <span
      v-if="verifyState.showResendButton"
      class="send-code-again mt-0-5 flex align-center"
      @click="resend"
    >
      <rotate-left-icon />
      <span class="ml-0-5">Отправить повторно</span>
    </span>
    <span v-else class="verification-timer mt-0-5">
      {{ verifyState.time.min }}:{{ verifyState.time.sec }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.ol-signin-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: hidden;
  height: 90vh;

  &-suggestion {
    margin-bottom: 0.75rem;
    font-size: 14px;
    color: var(--gf-secondary-color-3);
    font-weight: 400;
    line-height: 18px;
  }
}

.ol-phone-input {
  background: var(--gf-p-main-gray);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  min-height: 20px;
  font-size: 16px;
}

.ol-phone-number-label {
  font-size: 14px;
  line-height: 18px;
  color: var(--gf-p-primary-color);
}

.terms-conditions-content {
  display: flex;
  align-items: center;
}

.ol-service-message {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--gf-secondary-color-3);
}

.validation-failed {
  color: #dc3545;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}

.verification-phone {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
}

.verification-timer,
.send-code-again {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: linear-gradient(180deg, #00bbf9 0%, #00a3ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.send-code-again {
  cursor: pointer;
  user-select: none;
}
</style>
