<script setup>
import {defineProps} from 'vue';
import {useRouter} from 'vue-router';

const props = defineProps({
  to: {
    type: [String, Object],
    default: null
  },
  title: String,
  image: String,
  notification: [String, Number, Boolean]
})
const router = useRouter()

function navigate() {
  if (props.to) router.push(props.to)
}

function isBoolean(val) {
  return typeof val === 'boolean'
}
</script>

<template>
  <button
      class="category-card"
      @click="navigate"
  >
    <div
        v-if="notification"
        :class="['category-card__notification', {
        'category-card__notification--icon': isBoolean(notification)
      }]"
    >
      <template v-if="!isBoolean(notification)">
        {{ notification }}
      </template>
      <template v-else>
        <svg
            v-if="notification"
            data-src="/img/icons/tick_circle.svg"
        />
        <svg
            v-else
            data-src="/img/icons/cancel.svg"
        />
      </template>
    </div>
    <h2 class="category-card__title">
      {{ title }}
    </h2>
    <img
        :src="image"
        alt=""
        class="category-card__bg"
        :class="to['name']==='news'?'category-card__bg-news':''"
    >
  </button>
</template>


<style lang="scss" src="./Categories.scss"/>