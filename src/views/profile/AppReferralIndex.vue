<script setup>
import { computed, defineProps, ref } from "vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import EyeCloseIcon from "@/components/icons/EyeCloseIcon.vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import userAvatar from "@/assets/images/profile-image.svg";
import { useI18n } from "vue-i18n";
import AppSpinnerLoader from "@/components/elements/loader/AppSpinnerLoader.vue";

const { t } = useI18n();
const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
  relatedList: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const inputType = ref("password");

function triggerInputType() {
  inputType.value =
    inputType.value === "password"
      ? (inputType.value = "text")
      : (inputType.value = "password");
}

const computedMaxBalance = computed(() => {
  if (
    props.relatedList &&
    props.relatedList[0] &&
    props.relatedList[0].balance
  ) {
    return Math.round(props.relatedList[0].balance * 1.5);
  }
  return 50;
});

function computedLineWidth(percent) {
  return `width: ${(percent / computedMaxBalance.value) * 100}%`;
}

function generateUserName(user) {
  if (user.name.trim()) return user.name;
  return `Id: ${user.id}`;
}
</script>

<template>
  <div class="referral-index">
    <h4 class="referral-index__title">{{ t("referral_page.title") }}:</h4>
    <div class="referral-index__link">
      <button class="referral-index__link-hide" @click="triggerInputType">
        <eye-icon v-if="inputType === 'password'" color="var(--gf-text-33)" />
        <eye-close-icon v-else color="var(--gf-text-33)" />
      </button>
      <input :type="inputType" :value="props.property.link" :disabled="true" />
      <a
        :href="props.property.link"
        target="_blank"
        class="referral-index__link-share m-0"
      >
        <share-icon color="var(--gf-text-blue)" />
      </a>
    </div>

    <p class="referral-link-p">{{ props.property.link }}</p>

    <div class="referral-index__cards">
      <div class="referral-index__card">
        <p>{{ t("profile_page.referrals") }}</p>
        <span>{{ props.property.count }}</span>
      </div>

      <div class="referral-index__card">
        <p>{{ t("referral_page.income") }}</p>
        <span class="referral-index__card-coins">
          <img src="@/assets/icons/fitcoin.svg" alt="coin" />
          {{ props.property.coins }} Fit-Coin
        </span>
      </div>
    </div>

    <div id="infinite-list" class="referral-index__related">
      <div class="related-list">
        <div v-for="item in relatedList" :key="item.id" class="related-item">
          <div class="related-item__chart">
            <img :src="item.user?.avatar?.path || userAvatar" alt="" />
            <div
              class="related-item__line"
              :style="computedLineWidth(item.balance)"
            >
              <Popper
                arrow
                placement="top"
                style="
                  height: 100%;
                  width: 100%;
                  padding: 0;
                  margin: 0;
                  border: 0;
                "
              >
                <button style="height: 100%; width: 100%"></button>
                <template #content>
                  <div class="price">
                    <img
                      style="width: 16px; height: 16px"
                      src="@/assets/icons/fitcoin.svg"
                      alt="coin"
                    />
                    {{ item.balance }}
                  </div>
                </template>
              </Popper>
            </div>
          </div>
          <p class="related-item__user">
            {{ generateUserName(item.user) }}
          </p>
        </div>
      </div>
      <div v-if="loading" class="d-flex align-center justify-center">
        <app-spinner-loader size="24" color="var(--gf-p-loader-color)" />
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

  &__related {
    margin-top: 24px;
  }

  &__link {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    & button,
    a {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 1rem;
      background-color: var(--gf-basket-product-image-bg);
      border: none;
      margin: 0;

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

    &-coins {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;

      img {
        width: 16px;
        height: 16px;
      }
    }

    &:nth-child(2) {
      & span {
        color: var(--gf-accent-yellow);
      }
    }
  }
}

.related-list {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.related-item {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  .price {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  &__chart {
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    width: 100%;
    height: 24px;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 0.125em var(--gf-text-secondary-gray-2x);
    }
  }

  &__line {
    cursor: pointer;
    user-select: none;
    border: 0;
    height: 24px !important;
    background: #00cc6a;
    border-radius: 0 4px 4px 0;
  }

  &__user {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--text-main);
    margin-bottom: 0;
  }
}

.referral-link-p {
  @extend .text-15-600;
  color: var(--text-main);
  margin-bottom: 1rem;
}
</style>
