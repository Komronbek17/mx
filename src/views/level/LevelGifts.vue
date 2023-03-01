<script setup>


const props = defineProps({
    levels: Array
})
</script>


<template>
    <div class="gift-list">
        <div v-for="gift in props.levels " :key="gift.id + '_level_1'" class="gift-card">
            <div class="gift-card__image">
                <img :src="gift.image" :alt="gift.name">
            </div>
            <div class="gift-card__content">
                <h5>{{ gift.name }}</h5>
                <p v-if="gift.type !== 'prize'" class="infinity">&#x221e</p>
                <p v-else>{{ gift.count }} шт</p>
            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "./level-gifts-card.scss";
</style>