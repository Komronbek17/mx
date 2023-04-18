<script setup>
import { computed, ref } from "vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import AppBottomSheet from "@/components/elements/bottomSheet/AppBottomSheet.vue";
import InputRadio from "@/components/elements/input/InputRadio.vue";
import { isObject, isString } from "@/utils/inspect.util";
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  gValue: {
    type: String,
    default: "all",
  },
  label: {
    type: String,
    default: "label",
  },
  chooseText: {
    type: String,
    default: "Выбрать",
  },
  inputLabel: {
    type: String,
    default: "Choose",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(nValue) {
    const gIdx = props.options.findIndex(
      (option) => option[props.label] === nValue
    );
    if (gIdx !== -1) {
      emit("update:modelValue", props.options[gIdx]);
    } else {
      emit("update:modelValue", nValue);
    }

    closeBottomSheet();
  },
});
const inputValue = computed(() => {
  if (isString(value.value)) {
    return value.value;
  } else if (isObject(value.value)) {
    return value.value[props.label];
  }
});
const bottomOptionList = ref(null);

function openBottomSheet() {
  bottomOptionList.value.open();
}

function closeBottomSheet() {
  bottomOptionList.value.close();
}
</script>

<template>
  <div>
    <div class="ol-input-wrapper" @click="openBottomSheet">
      <BaseInput
        name="ol-region"
        v-model="inputValue"
        :label="inputLabel"
        :disabled="true"
      />
      <span class="ol-input-button" @click="openBottomSheet">
        {{ props.chooseText }}
      </span>
    </div>
    <app-bottom-sheet ref="bottomOptionList">
      <ul class="ol-input-option-list">
        <li v-for="(option, index) in props.options" :key="index">
          <input-radio v-model="value" :value="option[props.label]">
            {{ option[props.label] }}
          </input-radio>
        </li>
      </ul>
    </app-bottom-sheet>
  </div>
</template>

<style lang="scss" scoped>
.ol-input-wrapper {
  position: relative;

  .ol-input-button {
    position: absolute;
    right: 0;
    bottom: 0.5rem;
  }
}

.ol-input-option-list {
  height: auto;
  color: var(--gf-text-33);
}
</style>
