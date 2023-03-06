<script setup>
import { ref } from "vue";

import { useTelegram } from "@/composables/telegram.composable";
import { loadingComposable } from "@/composables/loading.composable";
import { WebAppController } from "@/utils/telegram/web.app.util";

import Popover from "@/components/ui/Popover/Popover.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

const popoverValue = ref(false);
const avatarSelected = ref(true);

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const { isNotFetched, telegramInfo, checkTelegramUser } = useTelegram();
const closePopover = () => {
  popoverValue.value = false;
};

const openPopover = () => {
  console.log("opened");
  popoverValue.value = true;
};
const popoverApply = () => {
  popoverValue.value = false;
  console.log("apply");
};

if (isNotFetched) {
  startLoading();
  try {
    checkTelegramUser();
  } finally {
    finishLoading();
  }
}

WebAppController.ready();
</script>

<template>
  <div class="profile-edit">
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <!--   PROFILE DETAILS   -->
      <div class="flex flex-column align-center">
        <div class="profile-edit__image">
          <img src="@/assets/images/profile-image.svg" alt="" />
        </div>

        {{ telegramInfo.user }}

        <p class="profile-edit__name">Отабек Каримов</p>
        <span class="profile-edit__id">ID: 270869</span>

        <div
          @click="openPopover"
          class="profile-edit__choose flex align-center"
        >
          <img src="@/assets/images/profile-choose-photo.svg" alt="" />
          <span>Выбрать фото профиля</span>
        </div>

        <!--    FORM    -->
        <form>
          <div>
            <label for="name" class="form-label">Имя</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Имя"
            />
          </div>

          <div>
            <label for="surname" class="form-label">Фамилия</label>
            <input
              type="text"
              class="form-control"
              id="surname"
              placeholder="Фамилия"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>

    <popover :popover-value="popoverValue" @close-popover="closePopover">
      <template #header>
        <h3 class="avatar-popover__header-title">Установить фото профиля</h3>
      </template>
      <template #content>
        <div class="avatar-popover__content">
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/1.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/2.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/3.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/1.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/2.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/3.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/1.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/2.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/3.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/1.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/2.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/3.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/1.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/2.svg" alt="" />
          </div>
          <div class="avatar-popover__item">
            <img src="@/assets/images/avatar/3.svg" alt="" />
          </div>
        </div>
      </template>
      <template #footer>
        <div :class="{ active: avatarSelected }" class="avatar-popover__footer">
          <div @click="popoverApply" class="footer-button">Окей</div>
        </div>
      </template>
    </popover>
  </div>
</template>

<style lang="scss" scoped>
.profile-edit {
  &__image {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    text-align: right;
    letter-spacing: -0.4px;
    color: #090909;
    margin-bottom: 0.5rem;
  }

  &__id {
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;
    color: #797d81;
    margin-bottom: 1rem;
  }

  &__choose {
    padding: 10px 1rem;
    background: #f2fbfd;
    border-radius: 8px;

    & img {
      margin-right: 1rem;
    }

    & span {
      font-weight: 400;
      font-size: 16px;
      line-height: 138%;
      letter-spacing: -0.5px;
      color: #090909;
    }
  }

  & form {
    width: 100%;

    & label {
      font-weight: 500;
      font-size: 13px;
      line-height: 115%;
      color: #dbdbdb;
    }

    & input {
      width: 100%;
      border: none;
      border-bottom: 1px solid #dbdbdb;
      font-weight: 400;
      font-size: 16px;
      line-height: 138%;
      letter-spacing: -0.5px;
      color: #090909;
      padding: 6px 0;
      margin-bottom: 1rem;

      &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 138%;
        letter-spacing: -0.5px;
        color: #dbdbdb;
      }

      &:focus-visible {
        outline: none;
        box-shadow: none;
      }
    }

    & button {
      margin-top: 1rem;
      width: 100%;
      background: #f5f5f5;
      border-radius: 8px;
      border: none;
      padding: 10px 0;
      font-weight: 600;
      font-size: 15px;
      line-height: 133%;
      text-align: center;
      letter-spacing: -0.4px;
      color: #797d81;
    }
  }
}

.avatar-popover {
  &__header {
    &-title {
      @extend .font-16-dark;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__footer {
    text-align: center;
    width: 100%;

    .footer-button {
      @extend .font-16-disabled;
      letter-spacing: -0.32px;
      border-radius: 0.5rem;
      padding: 12px;
      background: #f5f5f5;
    }

    &.active {
      .footer-button {
        @extend .font-16-white;
        background: linear-gradient(
          107.32deg,
          #4adaff -22.08%,
          #0062ca 122.03%
        );
      }
    }
  }
}
</style>
