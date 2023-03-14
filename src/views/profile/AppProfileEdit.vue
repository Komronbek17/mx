<script setup>
import {onMounted, ref} from "vue";

import {useTelegram} from "@/composables/telegram.composable";
import {loadingComposable} from "@/composables/loading.composable";
import {WebAppController} from "@/utils/telegram/web.app.util";

import Popover from "@/components/ui/Popover/Popover.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import {profileApi} from "@/services/profile.service";
import {useTelegramStore} from "@/stores/telegram.store";
import {useRouter} from "vue-router";
import BaseInput from "@/components/elements/form-input/BaseInput.vue";


const {tUser} = useTelegramStore();

const router = useRouter()

const user = ref({})
const userNewData = ref({
  upload_id: null,
  first_name: null,
  last_name: null
})
const avatars = ref([])
const popoverValue = ref(false);


const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const {isNotFetched, checkTelegramUser} = useTelegram();
const closePopover = () => {
  userNewData.value.upload_id = user.value.upload?.id || null;
  popoverValue.value = false;
};

const openPopover = () => {
  userNewData.value.upload_id = null
  popoverValue.value = true;
};
const popoverApply = () => {
  popoverValue.value = false;
};

if (isNotFetched) {
  startLoading();
  try {
    checkTelegramUser();
  } finally {
    finishLoading();
  }
}


function selectAvatar(item) {
  userNewData.value.upload_id = item.id
  user.value.upload = item
}


const getAvatars = async () => {
  try {
    const {data} = await profileApi.fetchAvatars()
    avatars.value = data.result
  } catch (e) {
    console.log(e, 'e');
  }
}

const getMe = async () => {
  try {
    const {data} = await profileApi.fetchMe()
    user.value = data.result
    user.value.first_name = data.result.first_name || tUser.first_name
    user.value.last_name = data.result.last_name || tUser.last_name

    userNewData.value.first_name = data.result.first_name || tUser.first_name
    userNewData.value.last_name = data.result.last_name || tUser.last_name
    userNewData.value.upload_id = data.result.upload?.id || null
  } catch (e) {
    console.log(e, 'e');
  }
}


const updateProfile = async () => {
  try {
    const body = userNewData.value
    const {data} = await profileApi.updateMe(body)
    if (data) {
      router.push({name: 'profile'})
    }
  } catch (e) {
    console.log(e, 'e');
  }
}


onMounted(async () => {
  await getMe()
  await getAvatars()
})


WebAppController.ready();
</script>

<template>
  <div class="profile-edit">
    <app-loader :active="isFetching"/>
    <div class="layout-container">
      <!--   PROFILE DETAILS   -->
      <div class="flex flex-column align-center">
        <div class="profile-edit__image">
          <img v-if="user && user.upload" :src="user.upload['path']" alt=""/>
          <img v-else src="@/assets/images/profile-image.svg" alt=""/>
        </div>
        <p class="profile-edit__name">{{ user.first_name }} {{ user.last_name }}</p>
        <span class="profile-edit__id">ID: {{ user.id }}</span>

        <button
            @click="openPopover"
            class="profile-edit__choose flex align-center"
        >
          <img src="@/assets/images/profile-choose-photo.svg" alt=""/>
          <span>Выбрать фото профиля</span>
        </button>

        <!--    FORM    -->
        <div class="form">

          <div class="form-content">
            <base-input
                v-model="userNewData.first_name"
                label="Имя"
                name="name"
            />

            <base-input
                v-model="userNewData.last_name"
                label="Фамилия"
                name="surname"
            />
          </div>

          <button @click="updateProfile" class="save-button">
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>

    <popover :popover-value="popoverValue" @close-popover="closePopover">
      <template #header>
        <h3 class="avatar-popover__header-title">Установить фото профиля</h3>
      </template>
      <template #content>
        <div class="avatar-popover__content">
          <div v-for="avatar in avatars" :key="avatar.id+'_avatar'" class="avatar-popover__item"
               @click="selectAvatar(avatar)">
            <img :src="avatar.path" alt=""/>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="popoverApply" :disabled="!userNewData.upload_id" class="avatar-popover__footer">
          <p class="footer-button">Окей</p>
        </button>
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
    color: var(--gf-login-input-text);
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
    margin-bottom: 1.5rem;

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

  & .form {
    width: 100%;

    &-content {
      display: flex;
      flex-direction: column;
      row-gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

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

    .save-button {
      @extend .font-15-white;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      letter-spacing: -0.32px;
      border-radius: 0.5rem;
      padding: 12px;
      background: linear-gradient(
              107.32deg,
              #4adaff -22.08%,
              #0062ca 122.03%
      );

    }
  }
}

.avatar-popover {
  &__header {
    &-title {
      @extend .font-16-dark;
    }
  }

  &__item {
    cursor: pointer;
    width: 3rem;
    height: 3rem;

    img {
      max-width: 100%;
      object-fit: contain;
    }
  }

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    letter-spacing: -0.32px;
    border-radius: 0.5rem;
    padding: 12px;
    background: linear-gradient(
            107.32deg,
            #4adaff -22.08%,
            #0062ca 122.03%
    );

    .footer-button {
      @extend .font-16-white;
    }

    &:disabled {
      .footer-button {
        @extend .font-16-disabled;
      }

      background: #f5f5f5;
    }
  }
}
</style>
