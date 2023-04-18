<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  value: {
    type: [Number, String, Object],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const vMValue = computed({
  get() {
    return props.optionValue;
  },
  set(nValue) {
    emit("update:modelValue", nValue);
  },
});
</script>

<template>
  <label class="d-flex align-start">
    <input
      type="radio"
      :value="value"
      :name="`ol-radio-xs`"
      v-model="vMValue"
    />
    <div class="input-round">
      <div class="d-flex flex-column align-start">
        <slot />
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
  /* Accessible outline */
  /* Remove comment to use */
  /*
    &:focus-within {
        outline: .125em solid $primary-color;
    }
  */
  input {
    position: absolute;
    left: -9999px;

    &:checked + div {
      &:before {
        box-shadow: inset 0 0 0 0.4375em #01a8ff;
      }
    }
  }

  .input-round {
    display: flex;
    align-items: center;
    padding: 0.75rem 0.75em 0.75rem 0.375em;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;

    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: transparent;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 1em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em var(--gf-text-secondary-gray-2x);
    }

    & h5 {
      font-size: 15px;
      font-weight: 600;
      color: var(--gf-text-33);
      margin-bottom: 6px;
    }

    & p {
      font-size: 14px;
      font-weight: 400;
      color: var(--gf-text-secondary-gray-2x);
    }
  }
}
</style>
