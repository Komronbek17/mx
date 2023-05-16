<script setup>
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-modal", "start-vote"]);
</script>

<template>
  <div>
    <modal-dialog :model-value="active" @close-modal="emit('close-modal')">
      <template #header>
        <div class="modal-header">
          <img src="@/assets/icons/money.svg" alt="" />
        </div>
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            {{ t("vote_page.title") }}
          </h3>
          <p class="modal-content__subtitle">
            {{ t("vote_page.description") }}
            <!--            {{-->
            <!--              t("connect_premium_service_message", {-->
            <!--                level: 1,-->
            <!--              })-->
            <!--            }}!-->
          </p>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer">
          <div
            @click="emit('start-vote')"
            class="modal-footer__button btn-info"
          >
            {{ t("vote_page.start_vote") }}
            <!--            {{ $t("ok") }}-->
          </div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>
