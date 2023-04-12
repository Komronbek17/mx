<script setup></script>

<template>
  <div class="referral-bonus">
    <div class="referral-bonus__cards">
      <div class="referral-bonus__card">
        <img src="@/assets/images/referral-minutes.svg" alt="" />
        <div class="flex flex-column">
          <p>Голосовой пакет 1000 минут</p>
          <span>25/12/2022 12:00</span>
        </div>
      </div>

      <div class="referral-bonus__card">
        <img src="@/assets/images/referral-internet.svg" alt="" />
        <div class="flex flex-column">
          <p>Интернет пакет 1000 MB</p>
          <span>25/12/2022 12:00</span>
        </div>
      </div>

      <div class="referral-bonus__card">
        <img src="@/assets/images/referral-lock.svg" alt="" />
        <div class="flex flex-column">
          <p>СМС пакет 1000 SMS</p>
          <span>
            <svg
              width="263"
              height="12"
              viewBox="0 0 263 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="263" height="12" rx="6" fill="white" />
              <rect
                :width="(80 / 100) * 263"
                height="12"
                rx="6"
                fill="#FFB914"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="referral-bonus__card">
        <img src="@/assets/images/referral-lock.svg" alt="" />
        <div class="flex flex-column">
          <p>Голосовой пакет 1000 минут</p>
          <span>
            <svg
              width="263"
              height="12"
              viewBox="0 0 263 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="263" height="12" rx="6" fill="white" />
              <rect
                :width="(50 / 100) * 263"
                height="12"
                rx="6"
                fill="#FFB914"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.referral-bonus {
  &__cards {
    display: flex;
    flex-direction: column;
  }

  &__card {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--gf-basket-product-image-bg);
    border-radius: 8px;
    margin-bottom: 12px;

    & img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      padding-right: 1rem;
    }

    & p {
      @extend .text-16-600;
      color: var(--gf-text-33);
    }

    & span {
      @extend .text-14-400;
      color: var(--gf-text-secondary-gray-2x);
    }
  }
}
</style>
