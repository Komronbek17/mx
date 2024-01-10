<script setup>
import TickCircleIcon from "@/components/icons/TickCircleIcon.vue";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

WebAppController.ready();
</script>

<template>
  <div
    class="flex flex-column justify-center align-center flash__successfully__layout"
  >
    <tick-circle-icon fill="rgba(0, 204, 106, 1)" size="80" />
    <h3 class="mt-1-5 mb-075 flash__successfully__title">
      {{ t("all_chances_are_taken") }}
    </h3>
    <p class="flash__successfully__description">
      {{ t("flash_come_back_desc") }}
    </p>
    <router-link class="mt-2 go__home" :to="{ name: 'home' }">
      {{ t("go_main_page") }}
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
* {
  color: var(--text-main);
}

.flash__successfully {
  &__layout {
    height: 100vh;
    text-align: center;
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
  }

  &__description {
    font-size: 0.875rem;
  }
}

.go__home {
  color: var(--light-gradients-blue);
  font-size: 1rem;
  font-weight: 600;
}
</style>
