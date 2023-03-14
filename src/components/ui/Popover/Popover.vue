<script setup>
const emit = defineEmits(["close-popover"]);
defineProps({
  popoverValue: Boolean,
});

import {useSlots} from "vue";

const slots = useSlots();

const closePopover = () => {
  emit("close-popover");
};
</script>

<template>
  <transition name="popover">
    <div v-show="popoverValue">
      <div @click="closePopover" class="backdrop"/>
      <div class="popover">
        <div class="popover-header">
          <slot name="header"/>
          <div @click="closePopover" class="popover-close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="var(--gf-close-svg)" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
            <!--            <img src="@/assets/images/close.svg" alt="" />-->
          </div>
        </div>
        <slot name="content"/>
        <slot v-if="slots.footer" name="footer"/>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" src="./popover.scss"/>
