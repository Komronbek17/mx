<script>
import AppSpinnerLoader from "@/components/elements/loader/AppSpinnerLoader.vue";

export default {
  name: "AppLoader",
  props: {
    active: Boolean,
    spinner: {
      type: String,
      default: "spinner",
    },
    text: {
      type: String,
      default: "",
    },
    textStyle: {
      type: Object,
      default: function () {
        return {};
      },
    },
    color: {
      type: String,
      default: "var(--gf-p-loader-color)",
    },
    isFullScreen: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "var(--gf-p-loader-background)",
    },
    size: {
      type: String,
      default: "40",
    },
    duration: {
      type: String,
      default: "0.6",
    },
    delay: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      isActive: this.active || false,
      isActiveDelay: false,
    };
  },
  /**
   * Append class 'velmld-parent' to parent container.
   */
  mounted() {
    this.$refs.velmld.parentNode.classList.add("velmld-parent");

    if (this.delay) {
      const delayMs = +this.delay * 1000;
      this.delayActive(delayMs);
    }
  },
  methods: {
    delayActive(ms) {
      this.isActiveDelay = true;

      setTimeout(() => {
        this.isActiveDelay = false;
      }, ms);
    },
  },
  watch: {
    /**
     * Binding outside component value and inside component value.
     * Append class 'velmld-parent' to parent container.
     */
    active(value) {
      this.isActive = value;
      if (value) {
        this.$refs.velmld.parentNode.classList.add("velmld-parent");
      }
    },
  },
  components: { AppSpinnerLoader },
};
</script>

<template>
  <transition name="fade">
    <div
      v-show="isActive || isActiveDelay"
      :class="{ 'velmld-full-screen': isFullScreen }"
      :style="{ backgroundColor }"
      ref="velmld"
      class="velmld-overlay"
    >
      <div class="velmld-spinner">
        <slot name="default">
          <app-spinner-loader
            :color="color"
            :size="`${size}px`"
            :duration="`${duration}s`"
          />
        </slot>
        <div v-if="text.length" :style="{ color, ...textStyle }">
          {{ text }}
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.velmld-overlay {
  position: absolute;
  z-index: 3000;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
}
.velmld-spinner {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;
  border-radius: 8px;
  padding: 1rem 2rem;
  background-color: var(--gf-p-loader-spinner-background);
}
.velmld-full-screen {
  position: fixed;
}
</style>

<style>
.velmld-parent {
  position: relative !important;
}
</style>
