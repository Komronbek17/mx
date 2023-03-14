<script setup>
import { ref } from "vue";
import {
  setLocalStorageVariable,
  getLocalStorageVariable,
} from "@/utils/localstorage.util";

import uzIcon from "@/assets/images/lang-uz-icon.svg";
import enIcon from "@/assets/images/lang-en-icon.svg";
import ruIcon from "@/assets/images/lang-ru-icon.svg";
import { useRouter } from "vue-router";

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
  {
    label: "English",
    code: "en",
    icon: enIcon,
  },
];
let activeLang = ref("");
const router = useRouter();

function getLangFromStorage() {
  activeLang.value = getLocalStorageVariable("lang") || "ru";
}

function changeLocale(item) {
  activeLang.value = item || "ru";
  setLocalStorageVariable("lang", item);
  router.push({ name: "settings" });
}

getLangFromStorage();
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
    background: var(--gf-accent-bg);
    border-radius: 8px;
    padding: 16px 9px;
    row-gap: 1rem;

    & img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    & p {
      @extend .font-15-dark;
      color: var(--gf-text-09);
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
