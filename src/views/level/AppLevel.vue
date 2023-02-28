<script setup>

import {useToast} from "vue-toastification";
import {levelApi} from "@/services/level.service";
import {ref} from "vue";
import LevelGifts from "@/views/level/LevelGifts.vue";

const toast = useToast();

const levels = ref([])


const activeLevel = ref(0)

const getLevels = async () => {
    try {
        const {data} = await levelApi.fetchLevels();
        levels.value = data
    } catch ({response}) {
        toast.error(response?.data?.message);
    }
}


getLevels()
</script>

<template>


    <div>
        <div class="layout-container">
            <div class="levels-statistics__cards-row">
                <levels-statistics-card
                    v-for="(level, index) in levels"
                    :key="index"
                    :item="level"
                    :class="{'levels-statistics-card--active': index === activeLevel}"
                >
                    <h2 class="levels-statistics-card__title">
                        {{ level.name }}
                    </h2>
                </levels-statistics-card>

            </div>


            <div>
                <level-gifts :levels="levels[activeLevel].gifts" :key="levels[activeLevel].id+'_level'"/>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import "level-style.scss";
</style>