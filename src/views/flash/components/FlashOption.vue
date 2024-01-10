<script setup>
import { computed } from "vue";
import BoldTickCircleIcon from "@/components/icons/BoldTickCircleIcon.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  hasReachedMax: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["add", "remove", "update:modelValue"]);
const { t } = useI18n();

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(selected) {
    emits("update:modelValue", selected);
  },
});

const packageType = computed(() => {
  if (props.option.type === "internet") {
    return "mb";
  }

  return props.option.type;
});

function activate() {
  if (selected.value) {
    selected.value = false;
    emits("remove");
  } else if (!props.hasReachedMax) {
    if (!props.disabled) {
      selected.value = true;
      emits("add");
    }
  }
}
</script>

<template>
  <div
    class="flash__option__layout"
    @click="activate"
    :class="{ selected, flash__option__disabled: props.disabled && !selected }"
  >
    <span class="flex justify-center">
      <bold-tick-circle-icon v-if="selected" />
      <slot v-else name="icon"> </slot>
    </span>
    <span class="flash__option__layout__prize">
      <span>{{ props.option.qty }}</span>
      <span class="flash__option__type">{{ t(`${packageType}`) }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.flash__option__layout {
  border-radius: 8px;
  background: var(--dark-accent-gray, #2a3139);
  width: 4rem;
  height: 5rem;
  padding: 0.75rem 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  cursor: pointer;
  user-select: none;

  &.selected {
    background: var(--light-gradients-blue-variant);
  }

  &__prize {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    place-items: center;
  }
}

.flash__option__type {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.flash__option__disabled {
  opacity: 0.3;
}
</style>
