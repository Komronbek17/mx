<script setup>
import {useRouter} from "vue-router";
import {WebAppController} from "@/utils/telegram/web.app.util";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const router = useRouter()

const props = defineProps({
  levels: Array
})


const viewProductEmit = (id) => {
  router.push({
    name: 'level-product', params: {id}
  })
}

WebAppController.ready();
</script>


<template>
  <div class="gift-list">
    <div v-for="gift in props.levels " :key="gift.id + '_level_1'" class="gift-card"
         @click="viewProductEmit(gift.id)">
      <div class="gift-card__image">
        <img :src="gift.image" :alt="gift.name">
      </div>
      <div class="gift-card__content">
        <h5>{{ gift.name }}</h5>
        <img v-if="gift.type !== 'prize'" src="@/assets/images/la_infinity.svg" alt="">
        <p v-else>{{ gift.count }} {{ t("quantity") }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "./level-gifts-card.scss";
</style>
