<script setup>
import { onMounted, reactive, watch } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import * as yup from "yup";

import RotateLeftIcon from "@/components/icons/RotateLeftIcon.vue";

import {
  localStorageController,
  sessionStorageController,
} from "@/utils/localstorage.util";

import { authApi } from "@/services/auth.service";
import { OLTIN_BALIQ_BOT_TKN, VERIFICATION_PHONE } from "@/constants";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { useI18n } from "vue-i18n";
import { telegramApi } from "@/services/telegram.service";
import { AmplitudeTracker } from "@/libs/amplitude/analyticsBrowser";

const { t } = useI18n();
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
  yup
    .string()
    .required(t("yup.required", { _field_: t("login_page.verify_code") }))
    .min(4, t("yup.min", { _field_: t("login_page.verify_code"), length: 4 }))
    .max(4, t("yup.max", { _field_: t("login_page.verify_code"), length: 4 }))
    .label(t("login_page.verify_code"))
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
      const { data } = await authApi.verify({
        body: {
          phone: sessionStorageController.get(VERIFICATION_PHONE),
          verify_code: olVerifyCode.value,
        },
      });

      localStorageController.set(OLTIN_BALIQ_BOT_TKN, data["access_token"]);

      await telegramApi.login({
        body: {
          phone: sessionStorageController.get(VERIFICATION_PHONE),
          user_id: data.user.id,
          telegram_id: WebAppController.webApp.initDataUnsafe.user.id,
          jwt: data["access_token"],
        },
      });

      AmplitudeTracker.signUpCompleted({
        properties: {
          user_id: data.user.id,
          sign_up_at: new Date(),
          phone_number: sessionStorageController.get(VERIFICATION_PHONE),
        },
      });

      sessionStorageController.remove(VERIFICATION_PHONE);

      await router.push({
        name: "home",
      });

      MainButtonController.hideProgress();
    } catch (e) {
      toast.error(e?.response.data.message ?? e.message);
    } finally {
      MainButtonController.hideProgress();
    }
  }
}

function setTime({ sec, min }) {
  if (sec >= 0) {
    verifyState.time.sec = sec > 9 ? sec : `0${sec}`;
  }

  if (min >= 0) {
    verifyState.time.min = min > 9 ? min : `0${min}`;
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
MainButtonController.setText(`${t("login_page.confirm_btn")}`);
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(verifyCode);
});

WebAppController.ready();
</script>

<template>
  <div class="ol-signin-content layout-container">
    <h3 class="verification-phone">{{ verifyState.phone }}</h3>
    <p class="ol-signin-content-suggestion mt-1 mb-075">
      {{ t("login_page.verify_1") }}
    </p>

    <label for="ol-verification-code" class="mb-0-5 ol-phone-number-label">
      {{ t("login_page.verify_2") }}:
    </label>
    <input
      class="ol-phone-input"
      type="tel"
      v-mask="'########'"
      id="ol-verification-code"
      :placeholder="t('login_page.code')"
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
      <span class="ml-0-5">{{ t("login_page.retry") }}</span>
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
  margin: auto;
  max-width: 360px;

  &-suggestion {
    margin-bottom: 0.75rem;
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 400;
    line-height: 18px;
  }
}

.ol-phone-input {
  color: var(--text-secondary);
  background: var(--accent-gray);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  min-height: 20px;
  font-size: 16px;
}

.ol-phone-number-label {
  font-size: 14px;
  line-height: 18px;
  color: var(--text-main);
}

.terms-conditions-content {
  display: flex;
  align-items: center;
}

.ol-service-message {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--text-secondary);
}

.validation-failed {
  color: var(--accent-red);
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
  background: var(--accent-yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.send-code-again {
  cursor: pointer;
  user-select: none;
}
</style>
