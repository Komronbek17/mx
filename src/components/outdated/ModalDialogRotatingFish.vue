<script setup>
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";

defineProps({
  modelValue: Boolean,
  submitBtn: Boolean,
  abortBtn: Boolean,
});

const emit = defineEmits(["submit", "close"]);

function submit() {
  emit("submit");
}

function abort() {
  emit("close");
}
</script>

<template>
  <modal-dialog v-if="modelValue">
    <div class="getting-bonus-dialog">
      <img
        src="/img/bonus_dialog_fish.svg"
        alt=""
        class="getting-bonus-dialog__img"
      />

      <slot />

      <div v-if="submitBtn || abortBtn" class="getting-bonus-dialog__btns">
        <div class="getting-bonus-dialog__btns__circle">
          <svg data-src="/img/icons/shadow_circle.svg" />
        </div>
        <button
          v-if="submitBtn"
          class="getting-bonus-dialog__btn getting-bonus-dialog__btn--ok"
          @click="submit"
        >
          <svg data-src="/img/icons/tick.svg" />
        </button>
        <button
          v-if="abortBtn"
          @click="abort"
          class="getting-bonus-dialog__btn getting-bonus-dialog__btn--cancel"
        >
          <svg data-src="/img/icons/cancel.svg" />
        </button>
      </div>
    </div>
  </modal-dialog>
</template>

<style scoped></style>
