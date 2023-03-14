<script setup>

import {computed} from "vue";

const props = defineProps({
      modelValue: {},
      name: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    }
)
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="cd-position-relative">
    <input
        v-model="value"
        class="floating-label-control cd-form-control cd-width-100"
        :type="props.type"
        :name="props.name"
        :id="props.label+'_id'"
        :placeholder="props.label"
    />
    <label class="floating-label" :for="props.name">{{ props.label }}</label>
  </div>
</template>

<style lang="scss" scoped>

.cd-form-control {
  background: transparent;
  border-bottom: 1px solid var(--gf-input-border);
  padding: 6px 0 6px !important;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.5px;
  transition: 0.2s;
  color: var(--gf-text-09);
}

.cd-form-control:focus {
  border-bottom: 1px solid var(--gf-text-blue);
}

.cd-form-control::placeholder {
  opacity: 1;
  color: var(--gf-input-text);
}

.cd-form-control:focus, .cd-form-control:focus-within {
  background: transparent;
  outline: none;
}

.floating-label {
  background: transparent;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: var(--gf-input-text);
  position: absolute;
  top: -3px;
  left: 0;
  transform: translateY(-50%);
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), color 0.2s;
  clip: auto;
  -webkit-clip-path: none;
  clip-path: none;
}

.floating-label-control {
  background-color: transparent;
  padding: 0.75rem calc(1rem + 24px) 0.75rem 1rem;
}

.floating-label-control:placeholder-shown { /* input with no content */
  background-color: transparent;
}

.floating-label-control:placeholder-shown + .floating-label { /* floating label state A - not visible */
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  transform: translateY(-25%);
}

/* focus */
.floating-label-control:focus {
  background-color: transparent;
}

.floating-label-control:focus + .floating-label {
  color: #32A8E6;
}

.cd-width-100 {
  width: 100% !important;
}

.cd-position-relative {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 12px;
}

</style>
