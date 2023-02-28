<script setup>
import { ref } from "vue";

const sound = ref(true);

function changeSoundMode() {
  sound.value = !sound.value;
}
</script>

<template>
  <div class="settings">
    <div class="layout-container">
      <div class="settings-cards">
        <router-link :to="{ name: 'settings-language' }" class="settings-card">
          <img src="@/assets/images/lang-icon.svg" alt="" />
          <p>Сменить язык</p>
        </router-link>

        <router-link :to="{ name: 'settings-sound' }" class="settings-card">
          <img
            v-if="sound === true"
            src="@/assets/images/sound-on-icon.svg"
            alt=""
          />
          <img v-else src="@/assets/images/sound-off-icon.svg" alt="" />
          <p>Выключить звук</p>
        </router-link>

        <router-link to="#" class="settings-card">
          <img src="@/assets/images/document-icon.svg" alt="" />
          <p>Публичная оферта</p>
        </router-link>

        <router-link to="#" class="settings-card">
          <img src="@/assets/images/message-icon.svg" alt="" />
          <p>Отписаться</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  &-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  &-card {
    background-color: #f2fbfd;
    border-radius: 8px;
    padding: 18px 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    text-decoration: none;

    & img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    & p {
      @extend .font-15-small-dark;
    }
  }
}
</style>
