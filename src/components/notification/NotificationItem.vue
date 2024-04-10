<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="notification-item">
    <div class="notification-item__image">
      <img src="@/assets/images/notification-income-icon.svg" alt="" />
      <!--      <img :src="item.image.path" alt="image" />-->
    </div>
    <div class="notification-item__details">
      <div>
        <p class="notification-item__title">{{ item.name }}</p>
        <span class="notification-item__description">
          {{ item.description }}
        </span>
      </div>
      <div>
        <img src="@/assets/images/arrow-down.svg" alt="" />
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
    cursor: pointer;
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

.ntc-popover {
  &__header {
    &-title {
      @extend .font-14-gray;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-bottom: 1.5rem;

    h3 {
      @extend .font-16-dark;
      letter-spacing: -0.32px;
    }

    p {
      @extend .font-14-dark;
    }
  }
}
</style>
