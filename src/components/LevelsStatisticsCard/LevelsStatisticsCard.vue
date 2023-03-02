<script setup>
import {defineProps} from 'vue';
import ProgressStar from "@/components/ui/ProgressStar/ProgressStar.vue";

const props = defineProps({
    level: Object,
    index: Number,
})


</script>


<template>
    <div class="level-card">

        <div class="level-star">
            <progress-star :index="index" :percent="props.level.percent"/>
        </div>
        <div class="level-content">
            <div class="level-card__name">
                {{ props.level.name }}
            </div>
            <div class="level-card__percent">
                {{ props.level.percent }} %
            </div>
        </div>


    </div>
</template>


<style lang="scss" scoped>
@import "./level-card.scss";
</style>