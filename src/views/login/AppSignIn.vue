<script setup>
import * as yup from "yup";
import { reactive, watch } from "vue";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import { authApi } from "@/services/auth.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { sessionStorageController } from "@/utils/localstorage.util";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import { VERIFICATION_PHONE } from "@/constants";

const toast = useToast();
const router = useRouter();
const loginState = reactive({
  agreement: false,
});
const {
  value: olSigninNumber,
  errors,
  meta,
  validate,
} = useField(
  "ol-signin-phone",
  yup.string().required().min(8).label("Phone number"),
  {
    initialValue: "+998 ",
  }
);

watch([() => loginState.agreement, () => meta.valid], ([agreement, valid]) => {
  if (agreement && valid) {
    MainButtonController.run();
    MainButtonController.resetButtonDesign();
  } else {
    MainButtonController.setBackgroundColor("#CCE7FF");
  }
});

async function sendCode() {
  const { valid } = await validate();
  if (valid && loginState.agreement) {
    MainButtonController.showProgress();
    try {
      const response = await authApi.login({
        body: { phone: olSigninNumber.value.replace(/[\s+-]/g, "") },
      });
      MainButtonController.hideProgress();
      sessionStorageController.set(VERIFICATION_PHONE, response.data.phone);
      await router.push({
        name: "verification",
      });
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e.message);
    } finally {
      MainButtonController.hideProgress();
    }
  }
}

MainButtonController.run();
MainButtonController.onClick(sendCode);
MainButtonController.setText("Подтвердить");
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(sendCode);
});

WebAppController.ready();
</script>

<template>
  <div class="ol-signin-content container">
    <h3 class="ol-signin-title">Авторизация</h3>
    <p class="ol-signin-content-suggestion mt-1 mb-075">
      На ваш номер будет отправлен SMS для активации вашего аккаунта.
    </p>

    <label for="ol-phone-number" class="mb-0-5 ol-phone-number-label">
      Ваш номер телефона
    </label>
    <input
      v-mask="'+998 ##-###-##-##'"
      v-model="olSigninNumber"
      class="ol-phone-input"
      type="tel"
      id="ol-phone-number"
    />

    <span v-if="errors.length" class="validation-failed">
      {{ errors[0] }}
    </span>

    <label class="flex align-center mt-0-5" for="ol-terms-conditions-checkbox">
      <input
        type="checkbox"
        v-model="loginState.agreement"
        id="ol-terms-conditions-checkbox"
      />
      <span class="ml-0-5 ol-accept-privacy">Я принимаю условия оферты</span>
    </label>

    <p class="ol-service-message mt-4 mb-1-5">
      Пользование сервисом “Al Chiroq” для абонента составляет 500 сум в день с
      НДС
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ol-accept-privacy {
  font-weight: 400;
  font-size: 14px;
  line-height: 129%;
  color: var(--gf-text-secondary-gray-2x);
}

.ol-signin-title {
  font-weight: 600;
  font-size: 28px;
  line-height: 121%;
  display: flex;
  align-items: center;
  color: var(--gf-text-09);
}

.ol-signin-content {
  display: flex;
  flex-direction: column;
  //justify-content: flex-end;
  //height: 80vh;
  overflow-y: hidden;

  &-suggestion {
    margin-bottom: 0.75rem;
    font-size: 14px;
    color: var(--gf-secondary-color-3);
    font-weight: 400;
    line-height: 18px;
  }
}

.ol-phone-input {
  background: var(--gf-login-input-bg);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  min-height: 20px;
  font-size: 16px;
  color: var(--gf-login-input-text);
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
</style>
