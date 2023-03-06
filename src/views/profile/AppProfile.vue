<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTelegram } from "@/composables/telegram.composable";
import { loadingComposable } from "@/composables/loading.composable";
import { useTelegramStore } from "@/stores/telegram.store";
import { localStorageController } from "@/utils/localstorage.util";
import { WebAppController } from "@/utils/telegram/web.app.util";

import AppLoader from "@/components/elements/loader/AppLoader.vue";
import DocumentTextIcon from "@/components/icons/DocumentTextIcon.vue";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import SupportIcon from "@/components/icons/SupportIcon.vue";

import { OLTIN_BALIQ_BOT_TKN } from "@/constants";

const { t } = useI18n();
const router = useRouter();
const { tUserFullName } = useTelegramStore();
const { isNotFetched, tUserUniqueId, checkTelegramUser } = useTelegram();
const profileState = reactive({
  showLogoutWarn: false,
});

const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();

function logout() {
  localStorageController.remove(OLTIN_BALIQ_BOT_TKN);
  router.push({
    name: "login",
  });
}

function showLogoutModal() {
  profileState.showLogoutWarn = true;
}

function hideLogoutModal() {
  profileState.showLogoutWarn = false;
}

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
  <div>
    <div class="profile">
      <app-loader :active-="isFetching" />
      <div class="layout-container">
        <!--   PROFILE DETAILS   -->
        <div class="flex flex-column align-center">
          <div class="profile-image">
            <img src="@/assets/images/profile-image.svg" alt="" />
          </div>

          <p class="profile-name">{{ tUserFullName }}</p>
          <span class="profile-id">ID: {{ tUserUniqueId }}</span>

          <!--        <div class="profile-change flex align-center">-->
          <!--          <img src="@/assets/images/change-profile.svg" alt="" />-->
          <!--          <span>Сменить аккаунт</span>-->
          <!--        </div>-->
        </div>
      </div>

      <!--  SOON IMAGE  -->
      <div class="profile-soon">
        <img src="@/assets/images/profile-progress-bar.png" alt="" />
        <span>{{ t("profile_page.soon") }}</span>
      </div>

      <!--    <div class="layout-container">-->
      <!--      &lt;!&ndash;   CARDS   &ndash;&gt;-->
      <!--      <div class="profile-cards">-->
      <!--        <router-link :to="{ name: 'referral-view' }" class="profile-card">-->
      <!--          <img-->
      <!--            class="profile-card__image"-->
      <!--            src="@/assets/images/profile-referal-icon.svg"-->
      <!--            alt=""-->
      <!--          />-->
      <!--          <p class="profile-card__title">Рефералы</p>-->
      <!--        </router-link>-->

      <!--        <router-link to="#" class="profile-card">-->
      <!--          <img-->
      <!--            class="profile-card__image"-->
      <!--            src="@/assets/images/profile-orders-icon.svg"-->
      <!--            alt=""-->
      <!--          />-->
      <!--          <p class="profile-card__title">Мои заказы</p>-->
      <!--        </router-link>-->
      <!--      </div>-->
      <!--    </div>-->

      <!--   LIST   -->
      <div class="profile-list">
        <!--      <router-link :to="{ name: 'profile-edit' }" class="profile-item">-->
        <!--        <img-->
        <!--          class="profile-item__icon"-->
        <!--          src="@/assets/images/profile-edit-icon.svg"-->
        <!--          alt=""-->
        <!--        />-->
        <!--        <div class="flex align-center justify-between b-bottom">-->
        <!--          <div>-->
        <!--            <p class="profile-item__title">Редактировать профиль</p>-->
        <!--          </div>-->

        <!--          <div class="flex align-center">-->
        <!--            <img-->
        <!--              class="profile-item__arrow"-->
        <!--              src="@/assets/images/profile-arrow-right.svg"-->
        <!--              alt=""-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </router-link>-->

        <!--      <router-link :to="{ name: 'notification' }" class="profile-item">-->
        <!--        <img-->
        <!--          class="profile-item__icon"-->
        <!--          src="@/assets/images/profile-notification-icon.svg"-->
        <!--          alt=""-->
        <!--        />-->
        <!--        <div class="flex align-center justify-between b-bottom">-->
        <!--          <div>-->
        <!--            <p class="profile-item__title">Уведомления</p>-->
        <!--          </div>-->

        <!--          <div class="flex align-center">-->
        <!--            <span class="profile-item__length">2</span>-->
        <!--            <img-->
        <!--              class="profile-item__arrow"-->
        <!--              src="@/assets/images/profile-arrow-right.svg"-->
        <!--              alt=""-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </router-link>-->

        <!--      <router-link to="#" class="profile-item">-->
        <!--        <img-->
        <!--          class="profile-item__icon"-->
        <!--          src="@/assets/images/profile-support-icon.svg"-->
        <!--          alt=""-->
        <!--        />-->
        <!--        <div class="flex align-center justify-between b-bottom">-->
        <!--          <div>-->
        <!--            <p class="profile-item__title">Тех поддержка</p>-->
        <!--          </div>-->

        <!--          <div class="flex align-center">-->
        <!--            <img-->
        <!--              class="profile-item__arrow"-->
        <!--              src="@/assets/images/profile-arrow-right.svg"-->
        <!--              alt=""-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </router-link>-->

        <a href="tel:712051548" target="_blank" class="profile-item">
          <support-icon class="profile-item__icon" />
          <div class="flex align-center justify-between b-bottom">
            <div>
              <p class="profile-item__title">Call center</p>
            </div>

            <div class="flex align-center">
              <img
                class="profile-item__arrow"
                src="@/assets/images/profile-arrow-right.svg"
                alt=""
              />
            </div>
          </div>
        </a>

        <router-link :to="{ name: 'informers' }" class="profile-item">
          <img
            class="profile-item__icon"
            src="@/assets/images/profile-informers-icon.svg"
            alt=""
          />
          <div class="flex align-center justify-between b-bottom">
            <div>
              <p class="profile-item__title">
                {{ t("profile_page.informers.title") }}
              </p>
            </div>

            <div class="flex align-center">
              <img
                class="profile-item__arrow"
                src="@/assets/images/profile-arrow-right.svg"
                alt=""
              />
            </div>
          </div>
        </router-link>

        <router-link :to="{ name: 'profile-privacy' }" class="profile-item">
          <document-text-icon fill="#00BBF9" class="profile-item__icon" />
          <div class="flex align-center justify-between b-bottom">
            <div>
              <p class="profile-item__title">{{ $t("public_offer") }}</p>
            </div>

            <div class="flex align-center">
              <img
                class="profile-item__arrow"
                src="@/assets/images/profile-arrow-right.svg"
                alt=""
              />
            </div>
          </div>
        </router-link>

        <div class="profile-item" @click="showLogoutModal">
          <img
            class="profile-item__icon"
            src="@/assets/images/profile-exit-icon.svg"
            alt=""
          />
          <div class="flex align-center justify-between b-bottom">
            <div>
              <p class="profile-item__title">{{ t("profile_page.exit") }}</p>
            </div>

            <div class="flex align-center">
              <img
                class="profile-item__arrow"
                src="@/assets/images/profile-arrow-right.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-dialog
      v-model="profileState.showLogoutWarn"
      @close-modal="hideLogoutModal"
    >
      <template #header>
        <logout-icon />
        <h3 class="ol-md-title">Выход</h3>
      </template>
      <template #content>
        <p class="ol-md-message">Вы уверены что хотите выйти из аккаунта?</p>
      </template>
      <template #footer>
        <div class="flex flex-column row-gap-1 w-100">
          <button class="ol-md-button ol-md-logout-button" @click="logout">
            Да, выйти
          </button>
          <button
            class="ol-md-button ol-md-close-button"
            @click="hideLogoutModal"
          >
            Остаться
          </button>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  //display: flex;
  //min-height: 90vh;
  //flex-direction: column;
  //justify-content: space-between;
  &-image {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-name {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    text-align: right;
    letter-spacing: -0.4px;
    color: var(--gf-text-09);
    margin-bottom: 0.5rem;
  }

  &-id {
    display: block;
    line-height: 129%;
    color: var(--gf-text-gray-2x);
    margin-bottom: 1rem;
  }

  &-change {
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

  &-soon {
    position: relative;
    margin-bottom: 24px;

    & span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      font-weight: 600;
      font-size: 17px;
      background: var(--gf-blue-gradient-01);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    & img {
      width: 100%;
      object-fit: contain;
    }
  }

  &-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 1rem;
    margin-bottom: 1rem;
  }

  &-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--gf-accent-bg);
    border-radius: 8px;
    text-decoration: none;

    &__image {
      margin-bottom: 1rem;
    }

    &__title {
      font-weight: 600;
      font-size: 15px;
      line-height: 107%;
      text-align: center;
      letter-spacing: -0.4px;
      color: var(--gf-text-09);
    }
  }

  &-list {
    padding: 0 0 1rem 0;
  }

  &-item {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0 0 1rem;
    cursor: pointer;

    &:hover {
      background-color: var(--gf-hover-bg);
    }

    & .b-bottom {
      width: 100%;
      border-bottom: 1px solid var(--gf-hover-bg);
      padding: 12px 1rem 12px 0;
    }

    &:last-child {
      & .b-bottom {
        border-bottom: none;
      }
    }

    &__icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin-right: 1rem;
    }

    &__title {
      font-weight: 400;
      font-size: 16px;
      line-height: 138%;
      letter-spacing: -0.5px;
      color: var(--gf-text-09);
    }

    &__length {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: var(--gf-notification-text-bg);
      font-weight: 500;
      font-size: 16px;
      line-height: 125%;
      text-align: center;
      letter-spacing: -0.32px;
      color: var(--gf-text-white-2x);
    }

    &__arrow {
      width: 24px;
      height: 24px;
      object-fit: contain;
      padding-left: 4px;
    }
  }
}

.ol-md-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 125%;
  letter-spacing: -0.4px;
  color: var(--gf-text-09);
}

.ol-md-message {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: var(--gf-text-gray-2x);
}

.ol-md-button {
  border-radius: 8px;
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-bottom: 0;
}

.ol-md-logout-button {
  color: var(--gf-notification-text-bg);
  background: var(--gf-exit-btn-bg);
}

.ol-md-close-button {
  color: var(--gf-text-09);
  background: var(--gf-accent-bg);
}

::v-deep .modal {
  background: var(--gf-bg-main);
}
</style>
