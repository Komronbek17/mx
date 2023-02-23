<template>
  <div class="checkbox">
    <input
      :id="randomID"
      :checked="computedChecked"
      :value="computedValue"
      class="checkbox__input"
      type="checkbox"
      @change="change()"
    >
    <label
      :for="randomID"
      class="checkbox__label"
    >
      <span class="checkbox__label__icon">
        <svg data-src="/img/icons/tick.svg" />
      </span>
      <span
        class="checkbox__label__text"
      >
        <slot name="label" />
      </span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  value: {
    type: [Number, String],
    default: null
  }
})
const emit = defineEmits([
  'change', 'update:modelValue'
])

const randomID = ref('id-' + Math.random().toString(32).slice(10))

const computedValue = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.value
  } else {
    return props.modelValue
  }
})
const computedChecked = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.modelValue.includes(props.value)
  } else {
    return props.modelValue
  }
})

function change () {
  if (typeof props.modelValue === 'object') {
    toggleArrayValue()
  } else {
    toggleBooleanValue()
  }
}

function toggleBooleanValue () {
  emit('update:modelValue', !computedValue.value)
  emit('change', !computedValue.value)
}

function toggleArrayValue () {
  if (props.modelValue.includes(props.value)) {
    removeFromArray()
  } else {
    props.modelValue.push(props.value)
  }
  emit('change', computedValue.value)
}
function removeFromArray () {
  const index = props.modelValue.findIndex(item => item === props.value)
  props.modelValue.splice(index, 1)
}
</script>

<style lang="scss" src="./Checkbox.scss" />