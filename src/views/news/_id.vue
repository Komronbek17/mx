<script setup>

</script>

<template>
  <div class="one-news">
    <img src="@/assets/images/news-one-image.png" alt="">
    <div class="layout-container">
      <span class="one-news__date">26.12.2022 15:58</span>

      <p class="one-news__title">Подключи интернет для бизнеса выгодно!</p>

      <div class="one-news__description"></div>

      <div class="one-news__btns flex align-center">
        <button class="flex align-center">
          <img src="@/assets/images/like.svg" alt="">
          <span>100</span>
        </button>
        <button class="flex align-center">
          <img src="@/assets/images/dislike.svg" alt="">
          <span>3</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.one-news {
  & img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  &__date {
    font-weight: 400;
    font-size: 14px;
    line-height: 133%;
    color: #A3ABB8;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 133%;
    letter-spacing: -0.5px;
    color: #333333;
    margin: 1rem 0;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 138%;
    letter-spacing: -0.5px;
    color: #333333;
  }

  &__btns {
    margin-top: 24px;
    & button {
      padding: 10px;
      border-radius: 8px;
      border: none;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }

      & img {
        width: 1rem;
        height: 1rem;
        object-fit: contain;
        margin-right: 4px;
      }

      & span {
        font-weight: 500;
        font-size: 14px;
        line-height: 114%;
        color: #333333;
      }
    }
  }
}
</style>
