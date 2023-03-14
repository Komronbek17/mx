<script setup>
import { computed } from "vue";
import uzIcon from "@/assets/images/lang-uz-icon.svg";
import ruIcon from "@/assets/images/lang-ru-icon.svg";
import { useI18n } from "vue-i18n";
import { useTelegramStore } from "@/stores/telegram.store";
import { telegramApi } from "@/services/telegram.service";
import { localStorageController } from "@/utils/localstorage.util";
import { ACCEPT_LANGUAGE } from "@/constants";
import { WebAppController } from "@/utils/telegram/web.app.util";
// import enIcon from "@/assets/images/lang-en-icon.svg";

const { locale } = useI18n();
const { tUserId } = useTelegramStore();
const availableLangs = [
  {
    label: "O'zbek tili",
    code: "uz",
    icon: uzIcon,
  },
  {
    label: "Русский",
    code: "ru",
    icon: ruIcon,
  },
  // {
  //   label: "English",
  //   code: "en",
  //   icon: enIcon,
  // },
];
let activeLang = computed(() => locale.value);

async function changeLocale(code) {
  locale.value = code;
  await telegramApi.switchLanguage({
    body: {
      telegram_id: tUserId,
      language: code,
    },
  });
  localStorageController.set(ACCEPT_LANGUAGE, locale.value);
}

WebAppController.ready();
</script>

<template>
  <div class="language">
    <div class="layout-container">
      <div class="language-cards">
        <div
          v-for="(lang, index) in availableLangs"
          :key="index"
          class="language-card"
          :class="activeLang === lang.code ? 'active' : ''"
          @click="changeLocale(lang.code)"
        >
          <img :src="lang.icon" alt="" />
          <p>{{ lang.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language {
  &-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }

  &-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f2fbfd;
    border-radius: 8px;
    padding: 16px 9px;
    row-gap: 1rem;
    cursor: pointer;

    & img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    & p {
      @extend .font-15-dark;
    }

    &.active {
      background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
      color: #fff;

      & p {
        @extend .font-15-white;
      }
    }
  }
}
</style>
