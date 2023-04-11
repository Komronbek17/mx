<script>
import { defineComponent } from "vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";

export default defineComponent({
  components: { EyeIcon, ShareIcon },
});
</script>

<template>
  <div class="referral-index">
    <h4 class="referral-index__title">Ваша реферальная ссылка:</h4>

    <div class="referral-index__link">
      <button class="referral-index__link-hide">
        <eye-icon color="var(--gf-text-white-2x)" />
      </button>
      <input type="text" />
      <button class="referral-index__link-share">
        <share-icon />
      </button>
    </div>

    <div class="referral-index__cards">
      <div class="referral-index__card">
        <p>Рефералы</p>
        <span>10</span>
      </div>

      <div class="referral-index__card">
        <p>Доход</p>
        <span>0%</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.referral-index {
  &__title {
    @extend .text-16-600;
    color: var(--gf-text-33);
    margin-bottom: 14px;
  }

  &__link {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    & button {
      height: 100%;
      padding: 0 1rem;
      background-color: var(--gf-basket-product-image-bg);
      border: none;

      & img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }

    &-hide {
      border-radius: 8px 0 0 8px;
    }

    &-share {
      border-radius: 0 8px 8px 0;
    }

    & input {
      @extend .text-14-400;
      color: var(--gf-text-33);
      width: 100%;
      height: 100%;
      background-color: var(--gf-basket-product-image-bg);
      padding: 0;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 1rem;
  }

  &__card {
    padding: 10px 16px;
    border-radius: 8px;
    background-color: var(--gf-basket-product-image-bg);

    & p {
      @extend .text-14-400;
      color: var(--gf-text-33);
      margin-bottom: 6px;
    }

    & span {
      @extend .text-16-600;
      color: var(--gf-text-33);
    }

    &:nth-child(2) {
      & span {
        color: var(--gf-accent-yellow);
      }
    }
  }
}
</style>
