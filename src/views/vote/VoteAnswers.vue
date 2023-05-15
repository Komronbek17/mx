<script setup>
import {computed} from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  vote: {
    type: Object,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: [Number, String, Array]
  },
});

const answerIds = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="vote-question">
    <h4 class="vote-question__title">
      {{ vote.name }}
    </h4>

    <div class="answer-list">
      <label
          v-for="answer in vote.answers"
          :key="answer.id + '_answer'"
          class="answer-item"
      >
        <p>
          {{ answer.name }}
        </p>
        <input
            v-model="answerIds"
            :value="answer.id"
            :type="vote.is_multiple ? 'checkbox' : 'radio'"
            :name="vote.id + '_question'"
            class="checkbox"
        />
        <div class="checkmark">
          <img
              class="default"
              src="@/assets/icons/checkbox-default.svg"
              alt="checkbox"
          />
          <img
              class="checked"
              src="@/assets/icons/checkbox-fill.svg"
              alt="checkbox"
          />
        </div>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vote-question {
  height: auto;
}

.vote-question__title {
  margin-bottom: 1rem;
}

.answer-list {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.answer-item {
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 12px 10px;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  p {
    @extend .font-16-dark;
    letter-spacing: -0.32px;
  }
}

/* Hide the browser's default checkbox */
.answer-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  order: -1;
}

.answer-item:hover {
  opacity: 0.8;
}

.checkmark .default {
  display: flex;
}

.checkmark .checked {
  display: none;
}

.answer-item input:checked ~ p {
  @include text-gradient(linear-gradient(180deg, #00bbf9 0%, #00a3ff 100%));
}

.answer-item input:checked ~ .checkmark .checked {
  display: flex;
}

.answer-item input:checked ~ .checkmark .default {
  display: none;
}
</style>
