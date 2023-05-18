<script setup>
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import { MARKET_POLICY_VIEWED } from "@/constants";
import { localStorageController } from "@/utils/localstorage.util";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";

const { t } = useI18n();
const show = ref(false);

function closeModalHandler() {
  show.value = false;
  localStorageController.set(MARKET_POLICY_VIEWED, true);
}

onMounted(() => {
  const hasViewedBefore = localStorageController.get(MARKET_POLICY_VIEWED);
  const inBoolean = hasViewedBefore ? JSON.parse(hasViewedBefore) : false;
  if (!inBoolean) {
    show.value = true;
  }
});
</script>

<template>
  <modal-dialog
    @close-modal="closeModalHandler"
    class="policy-modal-dialog"
    :model-value="show"
  >
    <template #header>
      <h3 class="m-title">{{ t("public_offer") }}</h3>
    </template>
    <template #content>
      <i18n-t class="m-message" keypath="market.policy_description" tag="p">
        <template #link>
          <router-link
            :to="{ name: 'profile-market-policy' }"
            style="text-transform: lowercase; color: var(--gf-text-blue)"
          >
            {{ t("public_offer") }}
          </router-link>
        </template>
      </i18n-t>
    </template>
    <template #footer>
      <div class="modal-footer">
        <div @click="closeModalHandler" class="modal-footer__button btn-info">
          {{ t("agree") }}
        </div>
      </div>
    </template>
  </modal-dialog>
</template>

<style lang="scss" scoped>
.m-title {
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: var(--text-main);
}

.m-message {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: var(--text-main);
}
</style>
