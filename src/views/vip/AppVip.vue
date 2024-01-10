<script setup>
import { localStorageController } from "@/utils/localstorage.util";
import { ACCEPT_LANGUAGE, OLTIN_BALIQ_BOT_TKN } from "@/constants";

const token = localStorageController.get(OLTIN_BALIQ_BOT_TKN);
const language = localStorageController.get(ACCEPT_LANGUAGE);
const vipUrl = `https://vip.gf.1it.uz/?language=${language}&token=${token}`;
</script>

<template>
  <iframe class="vip-frame" :src="vipUrl" allowfullscreen></iframe>
</template>

<style scoped>
.vip-frame {
  width: 100vw;
  height: 100vh;
}
</style>
