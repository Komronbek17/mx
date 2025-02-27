<script setup>
import * as yup from "yup";
import { computed, reactive, watch } from "vue";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import { authApi } from "@/services/auth.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { sessionStorageController } from "@/utils/localstorage.util";
import { MainButtonController } from "@/utils/telegram/main.button.controller";

import { useI18n } from "vue-i18n";
import { VERIFICATION_PHONE } from "@/constants";
import { useSignStore } from "@/stores/signin.store";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();
const loginState = reactive({
  agreement: false,
});

const { updateSignPhone, getSignPhone } = useSignStore();

const phoneYup = computed(() =>
  yup
    .string()
    .required(t("yup.required", { _field_: t("login_page.phone_number") }))
    .min(17, t("yup.min", { _field_: t("login_page.phone_number"), length: 9 }))
    .label(t("login_page.phone_number"))
);

const {
  value: signPhone,
  errors,
  meta,
  validate,
} = useField("ol-signin-phone", phoneYup, {
  initialValue: getSignPhone,
});

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
        body: { phone: signPhone.value.replace(/[\s+-]/g, "") },
      });
      MainButtonController.hideProgress();
      sessionStorageController.set(VERIFICATION_PHONE, response.data.phone);
      await router.push({
        name: "verification",
      });
    } catch (e) {
      toast.error(e?.response?.data?.phone[0] ?? e.message);
    } finally {
      MainButtonController.hideProgress();
    }
  }
}

MainButtonController.run();
MainButtonController.onClick(sendCode);
MainButtonController.setText(`${t("login_page.confirm_btn")}`);
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(sendCode);
});

WebAppController.ready();
</script>

<template>
  <div class="ol-signin-content">
    <h3 class="ol-signin-title">{{ t("login_page.text_1") }}</h3>
    <p class="ol-signin-content-suggestion mt-1 mb-075">
      {{ t("login_page.text_2") }}
    </p>

    <label for="ol-phone-number" class="mb-0-5 ol-phone-number-label">
      {{ t("login_page.label") }}
    </label>
    <input
      v-mask="'+998 ##-###-##-##'"
      v-model="signPhone"
      @input="updateSignPhone($event.target.value)"
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
      <span class="ml-0-5 ol-accept-privacy">
        {{ t("login_page.privacy_policy") }}
        <router-link :to="{ name: 'profile-policy' }">
          {{ t("login_page.privacy_agree") }}
        </router-link>
      </span>
    </label>

    <p class="ol-service-message mt-4 mb-1-5">
      {{ t("login_page.text_3") }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ol-accept-privacy {
  font-weight: 400;
  font-size: 14px;
  line-height: 129%;
  color: var(--text-secondary);
}

.ol-signin-title {
  font-weight: 600;
  font-size: 28px;
  line-height: 121%;
  display: flex;
  align-items: center;
  color: var(--text-main);
}

.ol-signin-content {
  display: flex;
  flex-direction: column;
  //justify-content: flex-end;
  //height: 80vh;
  overflow-y: hidden;
  padding: 1rem;

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
</style>
