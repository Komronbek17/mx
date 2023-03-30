<script setup></script>

<template>
  <div class="order-success">
    <div class="layout-container flex flex-column align-center justify-center">
      <img src="@/assets/images/success.svg" alt="" />
      <h4>Ваш заказ оформлен</h4>
      <p>Вы можете посмотреть статус вашего заказа в разделе “Профиль”</p>
      <router-link to="#">
        <img src="@/assets/images/arrow-left.svg" alt="" />
        <span>Вернуться на главную</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-success {
  & img {
    margin-bottom: 40px;
  }

  & h4 {
    @extend .heading-2;
    color: var(--text-main);
    margin-bottom: 6px;
  }

  & p {
    @extend .text-16-400;
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: 16px;
  }

  & a {
    display: flex;
    align-items: center;
    padding: 10px 40px;
    background: var(--accent-yellow);
    border-radius: 8px;
    margin-bottom: 1rem;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin: 0 10px 0 0;
    }

    & span {
      @extend .text-16-500;
      color: var(--neutral-white);
    }
  }
}
</style>
