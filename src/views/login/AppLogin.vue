<!--<script setup>-->
<!--import { computed, onMounted, reactive, ref } from "vue";-->
<!--import Checkbox from "@/components/ui/Checkbox/Checkbox";-->
<!--import AppButton from "@/components/ui/AppButton/AppButton";-->
<!--import api from "@/services/api";-->
<!--import { useToast } from "vue-toastification";-->
<!--import { useRouter } from "vue-router";-->
<!--import { tg } from "@/main";-->

<!--const ENTER_NUMBER = 1;-->
<!--const CONFIRM_NUMBER = 2;-->
<!--const TIMER_SECONDS = 60;-->

<!--const router = useRouter();-->
<!--const toast = useToast();-->
<!--const actualDialog = ref(ENTER_NUMBER);-->
<!--const loginForm = reactive({-->
<!--  phoneNumber: "",-->
<!--  agreement: false,-->
<!--});-->
<!--const timer = ref(null);-->
<!--const isResendActive = ref(false);-->
<!--const verification = reactive({-->
<!--  phone: "",-->
<!--  verify_code: null,-->
<!--});-->

<!--const isSubmitBtnDisabled = computed(() => {-->
<!--  return (-->
<!--    formatPhoneNumber(loginForm.phoneNumber).length < 9 || !loginForm.agreement-->
<!--  );-->
<!--});-->

<!--const isVerificationBtnDisabled = computed(() => {-->
<!--  return verification.verify_code-->
<!--    ? String(verification.verify_code).length === 4-->
<!--    : false;-->
<!--});-->

<!--function formatPhoneNumber(num, val = "") {-->
<!--  return num.replaceAll("-", val);-->
<!--}-->

<!--async function submitNumber() {-->
<!--  verification.phone = `998${formatPhoneNumber(loginForm.phoneNumber)}`;-->

<!--  try {-->
<!--    await api.auth.signInApi({-->
<!--      phone: verification.phone,-->
<!--    });-->
<!--    actualDialog.value = CONFIRM_NUMBER;-->
<!--    countDown(TIMER_SECONDS);-->
<!--  } catch ({ response }) {-->
<!--    toast.error(response.data.message);-->
<!--  }-->
<!--}-->

<!--async function phoneVerify() {-->
<!--  if (!isVerificationBtnDisabled.value) return;-->
<!--  try {-->
<!--    const { data } = await api.auth.verifyNumberApi(verification);-->
<!--    localStorage.setItem("accessToken", `Bearer ${data.access_token}`);-->
<!--    await router.push({-->
<!--      name: "Home",-->
<!--    });-->
<!--    await api.telegram.loginTelegram({-->
<!--      phone: verification.phone,-->
<!--      user_id: data.user.id,-->
<!--      telegram_id: tg.initDataUnsafe?.user?.id,-->
<!--      jwt: data.access_token,-->
<!--    });-->
<!--  } catch ({ response }) {-->
<!--    toast.error(response.data.message);-->
<!--  }-->
<!--}-->

<!--function backToEditNumber() {-->
<!--  actualDialog.value = ENTER_NUMBER;-->
<!--}-->

<!--function countDown(second) {-->
<!--  let minutes = parseInt(second / 60),-->
<!--    seconds = parseInt(second % 60);-->

<!--  const interval = setInterval(() => {-->
<!--    if (seconds < 1 && minutes > 0) {-->
<!--      &#45;&#45;minutes;-->
<!--      seconds = 59;-->
<!--    } else if (seconds < 1 && minutes < 1) {-->
<!--      clearInterval(interval);-->
<!--      isResendActive.value = true;-->
<!--    } else &#45;&#45;seconds;-->

<!--    minutes = minutes < 10 ? `0${+minutes}` : minutes;-->
<!--    seconds = seconds < 10 ? `0${+seconds}` : seconds;-->

<!--    timer.value = `${minutes}:${seconds}`;-->
<!--  }, 1000);-->
<!--}-->

<!--onMounted(() => {-->
<!--  if (localStorage.getItem("accessToken")) router.push({ name: "Home" });-->
<!--  if (actualDialog.value === CONFIRM_NUMBER) countDown(TIMER_SECONDS);-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <div class="login">-->
<!--    <template v-if="actualDialog === ENTER_NUMBER">-->
<!--      <h2 class="login__title">-->
<!--        {{ $t("loginPage.title") }}-->
<!--      </h2>-->
<!--      <p class="login__subtitle">-->
<!--        {{ $t("loginPage.subtitle") }}-->
<!--      </p>-->
<!--      <form class="form login__form">-->
<!--        <div class="form__group">-->
<!--          <div class="form__group__phone-code">+998</div>-->
<!--          <input-->
<!--            v-model="loginForm.phoneNumber"-->
<!--            type="text"-->
<!--            placeholder="XX-XXX-XX-XX"-->
<!--            v-mask="'##-###-##-##'"-->
<!--            class="form__group__phone-input"-->
<!--            inputmode="numeric"-->
<!--          />-->
<!--          <div class="form__group__phone-icon">-->
<!--            <svg data-src="/img/phone.svg" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="form__group">-->
<!--          <checkbox v-model="loginForm.agreement">-->
<!--            <template #label>-->
<!--              <i18n-t keypath="loginPage.agreement">-->
<!--                <template #msg>-->
<!--                  <span class="color&#45;&#45;green">{{ $t("offers") }}</span>-->
<!--                </template>-->
<!--              </i18n-t>-->
<!--            </template>-->
<!--          </checkbox>-->
<!--        </div>-->
<!--        <p class="login__alert">-->
<!--          {{ $t("loginPage.servicePrice") }}-->
<!--        </p>-->
<!--        <div class="login__form__buttons">-->
<!--          <app-button-->
<!--            :border-radius="30"-->
<!--            class="login__form__button&#45;&#45;lg app-button&#45;&#45;blue-linear"-->
<!--            :disabled="isSubmitBtnDisabled"-->
<!--            @click.prevent="submitNumber"-->
<!--          >-->
<!--            {{ $t("button.getCode") }}-->
<!--          </app-button>-->
<!--        </div>-->
<!--      </form>-->
<!--    </template>-->
<!--    <template v-else-if="actualDialog === CONFIRM_NUMBER">-->
<!--      <h2 class="login__title">-->
<!--        +998 {{ formatPhoneNumber(loginForm.phoneNumber, " ") }}-->
<!--      </h2>-->
<!--      <p class="login__subtitle">-->
<!--        {{ $t("loginPage.verify") }}-->
<!--      </p>-->
<!--      <div class="form login__form">-->
<!--        <div class="form__group form__group&#45;&#45;justify-center">-->
<!--          <input-->
<!--            v-model="verification.verify_code"-->
<!--            type="number"-->
<!--            placeholder="XXXX"-->
<!--            v-mask="'####'"-->
<!--            class="form__group__phone-input form__group__code-input"-->
<!--            @keyup.enter.stop="phoneVerify"-->
<!--          />-->
<!--          <div class="form__group__code-timer">-->
<!--            {{ timer }}-->
<!--          </div>-->
<!--        </div>-->

<!--        <button-->
<!--          v-if="isResendActive"-->
<!--          class="login__form__resend"-->
<!--          @click.prevent="submitNumber"-->
<!--        >-->
<!--          {{ $t("button.resendCode") }}-->
<!--        </button>-->

<!--        <div class="login__form__buttons">-->
<!--          <app-button-->
<!--            :border-radius="30"-->
<!--            class="login__form__button&#45;&#45;bordered login__form__button&#45;&#45;sm"-->
<!--            @click.prevent="backToEditNumber"-->
<!--          >-->
<!--            {{ $t("button.back") }}-->
<!--          </app-button>-->
<!--          <app-button-->
<!--            class="login__form__button&#45;&#45;sm app-button&#45;&#45;blue-linear"-->
<!--            :border-radius="30"-->
<!--            :disabled="!isVerificationBtnDisabled"-->
<!--            @click.prevent="phoneVerify"-->
<!--          >-->
<!--            {{ $t("button.submit") }}-->
<!--          </app-button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div>llll</div>
</template>
