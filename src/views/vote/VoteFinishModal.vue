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
  awardCoin: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(["close-modal"]);
</script>

<template>
  <div>
    <modal-dialog
      :model-value="props.active"
      :show-close-icon="false"
      @close-modal="emit('close-modal')"
    >
      <template #header>
        <div class="modal-header">
          <img src="@/assets/icons/award.svg" alt="" />
        </div>
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            {{ t("vote_page.finish_title") }}
          </h3>
          <p class="modal-content__subtitle">
            {{ t("vote_page.price", { price: awardCoin }) }}
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
            @click="emit('close-modal')"
            class="modal-footer__button btn-info"
          >
            {{ t("ok") }}
          </div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>
