<script setup>
import {onMounted, ref} from "vue";
import {loadingComposable} from "@/composables/loading.composable";
import {WebAppController} from "@/utils/telegram/web.app.util";
import Popover from "@/components/ui/Popover/Popover.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import {profileApi} from "@/services/profile.service";
import {useRouter} from "vue-router";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import {useI18n} from "vue-i18n";
import userAvatar from '@/assets/images/profile-image.svg'
import {useToast} from "vue-toastification";
import {useUserStore} from "@/stores/user.store";

const router = useRouter();
const toast = useToast()
const {t} = useI18n();
const {user, initUser, updateUser} = useUserStore()


const userNewData = ref({
  avatar: null,
  upload_id: null,
  first_name: null,
  last_name: null,
  region_id: null,
});
const avatars = ref([]);
const popoverValue = ref(false);
const regions = ref([]);
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

const closePopover = () => {
  // console.log(user.avatar,'user.value.avatar');
  userNewData.value.upload_id = user.upload?.id || null;
  userNewData.value.avatar = user.avatar || '';
  popoverValue.value = false;
};

const openPopover = () => {
  userNewData.value.upload_id = user.upload?.id || null;
  popoverValue.value = true;
};
const popoverApply = () => {
  popoverValue.value = false;
};

function selectAvatar(item) {
  userNewData.value.upload_id = item.id;
  userNewData.value.avatar = item?.path || '';
  // user.upload = item;
  // updateAvatar(item)
}

const getAvatars = async () => {
  try {
    const {data} = await profileApi.fetchAvatars();
    avatars.value = data.result;
  } catch (e) {
    toast.error(e?.response?.data.message ?? e.message);
  }
};

const getRegions = async () => {
  try {
    const {data} = await profileApi.fetchRegions();
    regions.value = data.result;
  } catch (e) {
    toast.error(e?.response?.data.message ?? e.message);
  }
};


function initializeNewUser() {
  userNewData.value.first_name = user.first_name;
  userNewData.value.last_name = user.last_name;
  userNewData.value.upload_id = user.upload?.id || null;
  userNewData.value.region_id = user.region?.id;
  userNewData.value.avatar = user.upload?.path || null;
}


const updateProfile = async () => {
  const body = userNewData.value;
  await profileApi.updateMe(body).then(async ({data}) => {
    if (data) {
      updateUser(data.result)
    } else {
      await initUser()
    }
  }).catch((e) => {
    toast.error(e?.response?.data.message ?? e.message);
  }).finally(async () => {
    await router.push({name: "profile"});
  })
};


onMounted(async () => {
  startLoading();
  if (!(user && user.id)) {
    await initUser();
  }
  initializeNewUser()
  await getRegions();
  await getAvatars();
  finishLoading();
});

WebAppController.ready();
</script>

<template>
  <div class="profile-edit">
    <app-loader :active="isFetching"/>
    <div class="layout-container">
      <!--   PROFILE DETAILS   -->
      <div class="flex flex-column align-center">
        <div class="profile-edit__image">
          <img
              :src="userNewData?.avatar || userAvatar"
              alt="avatar"
          />
        </div>
        <p class="profile-edit__name">
          {{ user.fullName }}
        </p>
        <span class="profile-edit__id">ID: {{ user.id }}</span>
        <button
            @click="openPopover"
            class="profile-edit__choose flex align-center"
        >
          <img src="@/assets/images/profile-choose-photo.svg" alt=""/>
          <span>{{ $t("profile_page.change_photo") }}</span>
        </button>

        <!--    FORM    -->
        <div class="form">
          <div class="form-content">
            <base-input
                v-model="userNewData.first_name"
                :label="t('profile_page.label_name')"
                name="name"
            />

            <base-input
                v-model="userNewData.last_name"
                :label="t('profile_page.label_surname')"
                name="surname"
            />
          </div>

          <div class="region-select">
            <label>{{ t("profile_page.choose_region") }}</label>
            <v-select
                :searchable="false"
                :options="regions"
                :reduce="(r) => r.id"
                v-model="userNewData.region_id"
                label="name"
            />
          </div>

          <button @click="updateProfile" class="save-button">
            {{ $t("profile_page.save_changes") }}
          </button>
        </div>
      </div>
    </div>

    <popover :popover-value="popoverValue" @close-popover="closePopover">
      <template #header>
        <h3 class="avatar-popover__header-title">
          {{ $t("profile_page.set_photo") }}
        </h3>
      </template>
      <template #content>
        <div class="avatar-popover__content">
          <div
              v-for="avatar in avatars"
              :key="avatar.id + '_avatar'"
              class="avatar-popover__item"
              :class="{'active-avatar':userNewData.upload_id === avatar.id}"
              @click="selectAvatar(avatar)"
          >
            <img :src="avatar.path" alt=""/>
          </div>
        </div>
      </template>
      <template #footer>
        <button
            @click="popoverApply"
            :disabled="!userNewData.upload_id"
            class="avatar-popover__footer"
        >
          <p class="footer-button">{{ $t("profile_page.set") }}</p>
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
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-break: anywhere;
    width: 80%;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    text-align: center;
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
    background: var(--gf-choose-image-profile);
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
      color: var(--gf-text-09);
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
      color: var(--gf-input-text);
    }

    & input {
      width: 100%;
      border: none;
      border-bottom: 1px solid #dbdbdb;
      font-weight: 400;
      font-size: 16px;
      line-height: 138%;
      letter-spacing: -0.5px;
      color: var(--gf-text-09);
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
      margin-top: 1rem;
      background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
    }
  }
}

.avatar-popover {
  &__header {
    &-title {
      @extend .font-16-dark;
      color: var(--gf-text-09);
    }
  }

  &__item {
    position: relative;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: .5rem;
    border: 2px solid transparent;

    &.active-avatar {
      position: relative;
      border: 2px solid var(--gf-p-green);
      &:after{
        content: '';
        position: absolute;
        top: -0.4rem;
        right: -0.4rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: url("@/assets/images/tick-circle.svg") 20px 20px #fff;
      }
    }

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
    background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);

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

::v-deep .region-select .v-select {
  margin-top: 4px;
  color: var(--gf-text-09);

  & label {
    font-weight: 500;
    font-size: 13px;
    line-height: 115%;
    color: var(--gf-input-text) !important;
  }

  & svg {
    fill: var(--gf-text-09);
  }

  & .vs__selected {
    color: var(--gf-text-09);
  }

  & .vs__dropdown-toggle {
    height: 40px;
    border: 1px solid var(--gf-input-border);
  }

  & ul {
    background: var(--gf-bg-main);
    border: 1px solid var(--gf-input-border);
    border-top-color: transparent;

    & li {
      color: var(--gf-text-09);

      &:hover {
        color: var(--gf-text-09);
        background: var(--gf-blue-gradient-01);
      }

      &:focus {
        color: var(--gf-text-09-reverse);
        background: var(--gf-blue-gradient-01);
      }
    }
  }

  & .vs__dropdown-option--selected {
    background: var(--gf-blue-gradient-01);
    color: var(--gf-text-white-2x);
  }
}
</style>
