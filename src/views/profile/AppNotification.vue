<script setup>
// import { useTelegramStore } from "@/stores/telegram.store";
//
// const telegramStore = useTelegramStore();
//
// console.log(telegramStore.webApp, "asd");
// telegramStore.webApp.showPopup.PopupButton;
</script>

<template>
  <div class="notification">
    <div class="layout-container">
      <div class="notification-date">
        <p class="notification-title">Сегодня</p>

        <PopupButton id="1" style="color: black" />

        <div class="notification-item">
          <div class="notification-item__image">
            <img src="@/assets/images/notification-support-icon.svg" alt="" />
          </div>
          <div class="notification-item__details">
            <div>
              <p class="notification-item__title">Тех поддержка</p>
              <span class="notification-item__description">
                Здравствуйте Alisher Rasulov, мы...
              </span>
            </div>
            <div>
              <img src="@/assets/images/arrow-down.svg" alt="" />
            </div>
          </div>
        </div>

        <div class="notification-item">
          <div class="notification-item__image">
            <img src="@/assets/images/notification-income-icon.svg" alt="" />
          </div>
          <div class="notification-item__details">
            <div>
              <p class="notification-item__title">Пополнение баланса</p>
              <span class="notification-item__description">
                Ваш баланс пополнен на 500 ...
              </span>
            </div>
            <div>
              <img src="@/assets/images/arrow-down.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="notification-date">
        <p class="notification-title">Вчера</p>

        <div class="notification-item">
          <div class="notification-item__image">
            <img src="@/assets/images/notification-income-icon.svg" alt="" />
          </div>
          <div class="notification-item__details">
            <div>
              <p class="notification-item__title">Пополнение баланса</p>
              <span class="notification-item__description">
                Ваш баланс пополнен на 500 ...
              </span>
            </div>
            <div>
              <img src="@/assets/images/arrow-down.svg" alt="" />
            </div>
          </div>
        </div>

        <div class="notification-item">
          <div class="notification-item__image">
            <img src="@/assets/images/notification-support-icon.svg" alt="" />
          </div>
          <div class="notification-item__details">
            <div>
              <p class="notification-item__title">Тех поддержка</p>
              <span class="notification-item__description">
                Здравствуйте Alisher Rasulov, мы...
              </span>
            </div>
            <div>
              <img src="@/assets/images/arrow-down.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  &-title {
    font-weight: 600;
    font-size: 17px;
    line-height: 129%;
    color: #333333;
    margin-bottom: 4px;
  }

  &-date {
    padding-bottom: 24px;
  }

  &-item {
    width: 100%;
    display: flex;
    align-items: center;

    &__image {
      min-width: 44px;
      height: 44px;
      background: #f5f5f5;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      & img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }

    &__details {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 1rem;
      padding: 12px 0;
      border-bottom: 1px solid #f5f5f5;

      & p {
        font-weight: 500;
        font-size: 16px;
        line-height: 125%;
        letter-spacing: -0.32px;
        color: #090909;
        margin-bottom: 6px;
      }

      & span {
        font-weight: 400;
        font-size: 14px;
        line-height: 129%;
        color: #797d81;
      }
    }

    &:last-child {
      .notification-item__details {
        border-bottom: none;
      }
    }
  }
}
</style>
