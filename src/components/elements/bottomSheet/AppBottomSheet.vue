<script setup>
// import Hammer from "hammerjs";
import { nextTick, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  overlay: {
    type: Boolean,
    default: true,
  },
  maxWidth: {
    type: String,
    default: "640px",
  },
  maxHeight: {
    type: String,
    default: "95vh",
  },
  clickToClose: {
    type: Boolean,
    default: true,
  },
  effect: {
    type: String,
    default: "fx-default",
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  swipeable: {
    type: Boolean,
    default: true,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
  overlayColor: {
    type: String,
    default: "#0000004D",
  },
  backgroundScrollable: {
    type: Boolean,
    default: false,
  },
  backgroundClickable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closed", "opened"]);

const bottomSheetCardContent = ref();
const bottomSheetCard = ref();

const opened = ref(false);
const moving = ref(false);

const contentH = ref("auto");
const cardP = ref(0);

const hammer = {
  pan: null,
  content: null,
};

// let inited = false;
// let contentScroll = 0;
let cardH = 0;
let stripe = 0;

onBeforeUnmount(() => {
  hammer.pan?.destroy();
  hammer.content?.destroy();
});

const isIphone = () => {
  const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
  const aspect = window.screen.width / window.screen.height;
  return iPhone && aspect.toFixed(3) === "0.462";
};

const init = async () => {
  await nextTick();
  contentH.value = "auto";
  stripe = isIphone() ? 20 : 0;
  cardH = bottomSheetCard.value.clientHeight;
  // contentH.value = `${cardH - pan.value.clientHeight}px`;
  bottomSheetCard.value.style.maxHeight = props.maxHeight;
  cardP.value =
    props.effect === "fx-slide-from-right" ||
    props.effect === "fx-slide-from-left"
      ? 0
      : -cardH - stripe;
  // if (!inited) {
  //   const options = {
  //     recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]],
  //   };
  //   hammer.pan = new Hammer(pan.value, options);
  //   if (hammer.pan) {
  //     hammer.pan.on("panstart panup pandown panend", (e) => {
  //       move(e, "pan");
  //     });
  //   }
  //   hammer.content = new Hammer(bottomSheetCardContent.value, options);
  //   if (hammer.content) {
  //     hammer.content.on("panstart panup pandown panend", (e) => {
  //       move(e, "content");
  //     });
  //   }
  //   inited = true;
  // }
};

const open = () => {
  opened.value = true;
  cardP.value = 0;
  if (!props.backgroundScrollable) {
    document.documentElement.style.overflowY = "hidden";
  }
  emit("opened");
};

// const move = (event, type) => {
//   if (props.swipeable) {
//     const delta = -event.deltaY;
//     if (
//       (type === "content" && event.type === "panup") ||
//       (type === "content" && event.type === "pandown" && contentScroll > 0)
//     ) {
//       bottomSheetCardContent.value.scrollTop = contentScroll + delta;
//     } else if (event.type === "panup" || event.type === "pandown") {
//       moving.value = true;
//       if (event.deltaY > 0) {
//         cardP.value = delta;
//       }
//     }
//     if (event.isFinal) {
//       contentScroll = bottomSheetCardContent.value.scrollTop;
//       moving.value = false;
//       if (cardP.value < -30) {
//         opened.value = false;
//         cardP.value = -cardH - stripe;
//         document.documentElement.style.overflowY = "";
//         emit("closed");
//       } else {
//         cardP.value = 0;
//       }
//     }
//   }
// };

const close = () => {
  opened.value = false;
  cardP.value =
    props.effect === "fx-slide-from-right" ||
    props.effect === "fx-slide-from-left"
      ? 0
      : -cardH - stripe;
  document.documentElement.style.overflowY = "";
  emit("closed");
};

const clickOnBottomSheet = (event) => {
  if (props.clickToClose) {
    const target = event.target;
    if (
      target.classList.contains("bottom-sheet__backdrop") ||
      target.classList.contains("bottom-sheet")
    ) {
      close();
    }
  }
};

defineExpose({ open, close });

init();
</script>

<template>
  <Teleport to="body">
    <div
      ref="bottomSheet"
      :class="[
        'bottom-sheet',
        {
          opened: opened,
          closed: opened === false,
          moving: moving,
        },
      ]"
      :style="{
        'pointer-events':
          props.backgroundClickable && props.clickToClose === false
            ? 'none'
            : 'all',
      }"
      @mousedown="clickOnBottomSheet"
      @touchstart="clickOnBottomSheet"
    >
      <div
        v-if="props.overlay"
        class="bottom-sheet__backdrop"
        :style="{ background: props.overlayColor }"
      />
      <div
        ref="bottomSheetCard"
        :style="[
          {
            bottom: cardP + 'px',
            maxWidth: props.maxWidth,
            maxHeight: props.maxHeight,
          },
          { height: props.fullScreen ? '100vh' : 'auto' },
          { 'pointer-events': 'all' },
        ]"
        :class="[
          'bottom-sheet__card',
          { stripe: stripe, square: !props.rounded },
          props.effect,
        ]"
      >
        <!--        <div ref="pan" class="bottom-sheet__pan">-->
        <!--          <div class="bottom-sheet__bar"></div>-->
        <!--        </div>-->
        <div
          ref="bottomSheetCardContent"
          class="bottom-sheet__content"
          :style="{
            height: props.height,
          }"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.bottom-sheet {
  z-index: 99999;
  transition: all 0.4s ease;
  position: relative;

  * {
    box-sizing: border-box;
  }

  &__content {
    overflow-y: scroll;
    //height: v-bind(contentH);
    //min-height: 50vh;
    height: 75vh;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
  }

  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
  }

  &__card {
    width: 100%;
    pointer-events: all;
    position: fixed;
    background: var(--neutral-background);
    border-radius: 14px 14px 0 0;
    left: 50%;
    z-index: 9999;
    margin: 0 auto;

    &.square {
      border-radius: 0;
    }

    &.stripe {
      padding-bottom: 20px;
    }

    &.fx-default {
      transform: translate(-50%, 0);
      transition: bottom 0.3s ease;
    }

    &.fx-fadein-scale {
      transform: translate(-50%, 0) scale(0.7);
      opacity: 0;
      transition: all 0.3s;
    }

    &.fx-slide-from-right {
      transform: translate(100%, 0);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    }

    &.fx-slide-from-left {
      transform: translate(-100%, 0);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    }
  }

  &__pan {
    padding-bottom: 20px;
    padding-top: 15px;
    height: 38px;
  }

  &__bar {
    display: block;
    width: 50px;
    height: 3px;
    border-radius: 14px;
    margin: 0 auto;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
  }

  &.closed {
    opacity: 0;
    visibility: hidden;

    .bottom-sheet__backdrop {
      animation: hide 0.3s ease;
    }
  }

  &.moving {
    .bottom-sheet__card {
      transition: none;
    }
  }

  &.opened {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .bottom-sheet__backdrop {
      animation: show 0.3s ease;
      opacity: 1;
      visibility: visible;
    }

    .bottom-sheet__card {
      &.fx-fadein-scale {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }

      &.fx-slide-from-right {
        transform: translate(-50%, 0);
        opacity: 1;
      }

      &.fx-slide-from-left {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
  }
}

@keyframes show {
  0% {
    opacity: 0;
    visibility: hidden;
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
    visibility: visible;
  }

  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
