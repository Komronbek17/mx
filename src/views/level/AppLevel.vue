<script setup>

import {useToast} from "vue-toastification";
import {levelApi} from "@/services/level.service";
import {onMounted, ref} from "vue";
import LevelGifts from "@/views/level/LevelGifts.vue";
import LevelsStatisticsCard from "@/components/LevelsStatisticsCard/LevelsStatisticsCard.vue";

const toast = useToast();

const levels = ref([])


const activeLevel = ref(0)

const getLevels = async () => {
    try {
        const {data} = await levelApi.fetchLevelsWithFloat();
        levels.value = data
    } catch ({response}) {
        toast.error(response?.data?.message);
    }
}

const activateLevel = (id) => {
    activeLevel.value = id
}

onMounted(() => {
    getLevels()
})

</script>

<template>

    <div>
        <div class="layout-container">
            <div class="levels-list">
                <levels-statistics-card
                    v-for="(level, index) in levels"
                    :key="index"
                    :level="level"
                    :index="index"
                    :class="[{'levels-card__active': index === activeLevel}, `levels-card__${index}`]"
                    @click="activateLevel(index)"
                />
            </div>

            <div v-if="levels[activeLevel]">
                <level-gifts :levels="levels[activeLevel].gifts" :key="levels[activeLevel].id+'_level'"/>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import "./level-style.scss";
</style>