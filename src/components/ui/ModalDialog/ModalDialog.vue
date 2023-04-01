<script setup>
import { useSlots } from "vue";

const emit = defineEmits(["close-modal"]);
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  showCloseIcon: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();

const closeModal = () => {
  emit("close-modal");
};
</script>

<template>
  <transition name="modal">
    <div v-show="modelValue">
      <div @click="closeModal" class="backdrop" />
      <div class="modal">
        <div v-if="showCloseIcon" @click="closeModal" class="modal-close">
          <img src="@/assets/images/close.svg" alt="" />
        </div>
        <slot v-if="slots.header" name="header" />
        <slot v-if="slots.content" name="content" />
        <slot v-if="slots.footer" name="footer" />
      </div>
    </div>
  </transition>
</template>
<style lang="scss" src="./ModalDialog.scss" />
