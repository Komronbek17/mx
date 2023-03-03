<script setup>
const emit = defineEmits(["close-popover"]);
defineProps({
  popoverValue: Boolean,
});

import { useSlots } from "vue";
const slots = useSlots();

const closePopover = () => {
  emit("close-popover");
};
</script>

<template>
  <transition name="popover">
    <div v-show="popoverValue">
      <div @click="closePopover" class="backdrop" />
      <div class="popover">
        <div class="popover-header">
          <slot name="header" />
          <div @click="closePopover" class="popover-close">
            <img src="@/assets/images/close.svg" alt="" />
          </div>
        </div>
        <slot name="content" />
        <slot v-if="slots.footer" name="footer" />
      </div>
    </div>
  </transition>
</template>
<style lang="scss" src="./popover.scss" />
