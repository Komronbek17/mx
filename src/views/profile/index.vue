<script></script>

<template>
  <div class="profile">
    <div class="layout-container">
      <!--   PROFILE DETAILS   -->
      <div class="flex flex-column align-center">
        <div class="profile-image">
          <img src="@/assets/images/profile-image.svg" alt="" />
        </div>

        <p class="profile-name">Отабек Каримов</p>
        <span class="profile-id">ID: 270869</span>

        <div class="profile-change flex align-center">
          <img src="@/assets/images/change-profile.svg" alt="" />
          <span>Сменить аккаунт</span>
        </div>
      </div>
    </div>

    <!--  SOON IMAGE  -->
    <div class="profile-soon">
      <img src="@/assets/images/profile-progress-bar.png" alt="" />
      <span>Совсем скоро...</span>
    </div>

    <div class="layout-container">
      <!--   CARDS   -->
      <div class="profile-cards">
        <router-link to="#" class="profile-card">
          <img
            class="profile-card__image"
            src="@/assets/images/profile-referal-icon.svg"
            alt=""
          />
          <p class="profile-card__title">Рефералы</p>
        </router-link>

        <router-link to="#" class="profile-card">
          <img
            class="profile-card__image"
            src="@/assets/images/profile-orders-icon.svg"
            alt=""
          />
          <p class="profile-card__title">Мои заказы</p>
        </router-link>
      </div>
    </div>

    <!--   LIST   -->
    <div class="profile-list">
      <router-link to="#" class="profile-item">
        <img
          class="profile-item__icon"
          src="@/assets/images/profile-edit-icon.svg"
          alt=""
        />
        <div class="flex align-center justify-between b-bottom">
          <div>
            <p class="profile-item__title">Редактировать профиль</p>
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

      <router-link :to="{ name: 'notification' }" class="profile-item">
        <img
          class="profile-item__icon"
          src="@/assets/images/profile-notification-icon.svg"
          alt=""
        />
        <div class="flex align-center justify-between b-bottom">
          <div>
            <p class="profile-item__title">Уведомления</p>
          </div>

          <div class="flex align-center">
            <span class="profile-item__length">2</span>
            <img
              class="profile-item__arrow"
              src="@/assets/images/profile-arrow-right.svg"
              alt=""
            />
          </div>
        </div>
      </router-link>

      <router-link to="#" class="profile-item">
        <img
          class="profile-item__icon"
          src="@/assets/images/profile-support-icon.svg"
          alt=""
        />
        <div class="flex align-center justify-between b-bottom">
          <div>
            <p class="profile-item__title">Тех поддержка</p>
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

      <router-link to="#" class="profile-item">
        <img
          class="profile-item__icon"
          src="@/assets/images/profile-informers-icon.svg"
          alt=""
        />
        <div class="flex align-center justify-between b-bottom">
          <div>
            <p class="profile-item__title">Информеры</p>
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

      <router-link to="#" class="profile-item">
        <img
          class="profile-item__icon"
          src="@/assets/images/profile-exit-icon.svg"
          alt=""
        />
        <div class="flex align-center justify-between b-bottom">
          <div>
            <p class="profile-item__title">Выйти из аккаунта</p>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
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
    color: #090909;
    margin-bottom: 0.5rem;
  }

  &-id {
    display: block;
    line-height: 129%;
    color: #797d81;
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
      line-height: 129%;
      background: linear-gradient(180deg, #00bbf9 0%, #00a3ff 100%);
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
    background: #f2fbfd;
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
      color: #090909;
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

    & .b-bottom {
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
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
      color: #090909;
    }

    &__length {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #eb5757;
      font-weight: 500;
      font-size: 16px;
      line-height: 125%;
      text-align: center;
      letter-spacing: -0.32px;
      color: #ffffff;
    }

    &__arrow {
      width: 24px;
      height: 24px;
      object-fit: contain;
      padding-left: 4px;
    }
  }
}
</style>
