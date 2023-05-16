<script setup>
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";
import BotCloseIcon from "@/components/icons/BotCloseIcon.vue";
import { getCreatedDate } from "@/utils/date.formatter";

const { t } = useI18n();
const emit = defineEmits(["close-bottom-sheet"]);

const closeBottomSheet = () => {
  emit("close-bottom-sheet");
};

const props = defineProps({
  previewData: {
    type: Object,
    required: true,
  },
});

console.log("lll", props.previewData);
</script>

<template>
  <div class="order">
    <div class="layout-container">
      <!--    HEADER    -->
      <div class="order-header">
        <h3 class="order-header_title">{{ t("market_page.order_details") }}</h3>
        <button class="order-header_close">
          <BotCloseIcon
            @click="closeBottomSheet"
            size="28"
            fill="var(--text-main)"
          />
        </button>
      </div>

      <div class="order-body">
        <h3 class="order-body_title">
          {{ t("market_page.order") }} №{{ props.previewData.id }}
        </h3>
        <div class="order-body_details">
          <p>{{ t("market_page.address") }}</p>
          <div class="flex flex-column align-end">
            <span>{{ props.previewData.address.address }}</span>
            <span>{{ props.previewData.address.city.name }}</span>
            <span>{{ props.previewData.address.region.name }}</span>
          </div>
        </div>

        <div class="order-body_details">
          <p>{{ t("status") }}</p>
          <div class="flex flex-column align-end">
            <span :style="{ color: props.previewData.color }">{{
              props.previewData.status
            }}</span>
          </div>
        </div>

        <div class="order-body_details">
          <p>{{ t("order_time") }}</p>
          <div class="flex flex-column align-end">
            <span>{{ getCreatedDate(props.previewData.date) }}</span>
          </div>
        </div>

        <div class="order-body_details">
          <p>{{ t("market_page.form.receiver") }}</p>
          <div class="flex flex-column align-end">
            <span
              >{{ props.previewData.client_detail.first_name }}
              {{ props.previewData.client_detail.last_name }}</span
            >
          </div>
        </div>

        <div class="order-body_comment">
          <p>{{ t("comments") }}</p>
          <span v-if="props.previewData.comment">{{
            props.previewData.comment
          }}</span>
          <span v-else>{{ t("no_comment") }}</span>
        </div>

        <h3 class="order-body_title">{{ t("products") }}</h3>

        <div class="order-body_products">
          <div
            class="order-body_product"
            v-for="item in props.previewData.order_items"
            :key="item.id"
          >
            <div class="order-body_product-img">
              <img :src="item.product.images[0].path" alt="" />
            </div>
            <div class="flex align-center justify-between w-100">
              <div class="order-body_product-details">
                <p>{{ item.product.name }}</p>
                <p>
                  <span>{{ t("market_page.quantity") }}:</span>
                  {{ item.quantity }}
                </p>
              </div>
              <div class="order-body_product-price">
                <img src="@/assets/images/fitcoin.svg" alt="" />
                <span>{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="order-footer">
        <div class="order-footer_subtotal flex align-center justify-between">
          <p>{{ t("subtotal") }}</p>
          <div class="flex align-center">
            <img src="@/assets/images/fitcoin.svg" alt="" />
            <span>{{ props.previewData.total }}</span>
          </div>
        </div>
        <div class="order-footer_delivery flex align-center justify-between">
          <p>{{ t("market_page.delivery") }}</p>
          <div class="flex align-center">
            <img src="@/assets/images/fitcoin.svg" alt="" />
            <span>{{ props.previewData.delivery_cost }}</span>
          </div>
        </div>
        <div class="order-footer_total flex align-center justify-between">
          <p>{{ t("total_with_delivery") }}</p>
          <div class="flex align-center">
            <img src="@/assets/images/fitcoin.svg" alt="" />
            <span>{{ props.previewData.grand_total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  padding: 0 1rem;
}

.order {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    &_title {
      @extend .text-16-500;
      color: var(--text-main);
    }
  }

  &-body {
    &_title {
      @extend .text-17-600;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    &_details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      & p {
        @extend .text-14-400;
        color: var(--text-secondary);
      }

      & span {
        @extend .text-14-400;
        color: var(--text-main);
        text-align: end;
      }
    }

    &_comment {
      margin-bottom: 1.5rem;
      & p {
        @extend .text-14-400;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      & span {
        @extend .text-14-400;
        color: var(--text-main);
      }
    }

    &_products {
      border-bottom: 1px solid var(--text-secondary);
      margin-bottom: 1rem;
    }

    &_product {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      &-img {
        width: 44px;
        height: 44px;
        min-width: 44px;
        background-color: var(--accent-gray);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;

        & img {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }
      }

      &-details {
        & p {
          @extend .text-14-400;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        & span {
          @extend .text-14-400;
          color: var(--text-main);
        }
      }

      &-price {
        display: flex;
        align-items: center;
        justify-content: center;

        & img {
          width: 16px;
          height: 16px;
          object-fit: contain;
          margin-right: 0.4rem;
        }

        & span {
          @extend .text-14-400;
          color: var(--text-main);
        }
      }
    }
  }

  &-footer {
    &_subtotal {
      margin-bottom: 1rem;
      & p {
        @extend .text-14-400;
        color: var(--text-main);
      }

      & span {
        @extend .text-14-400;
        color: var(--text-main);
      }

      & img {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin-right: 0.4rem;
      }
    }

    &_delivery {
      margin-bottom: 1rem;
      & p {
        @extend .text-14-400;
        color: var(--text-main);
      }

      & span {
        @extend .text-14-400;
        color: var(--text-main);
      }

      & img {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin-right: 0.4rem;
      }
    }

    &_total {
      margin-bottom: 1rem;
      & p {
        @extend .text-20-600;
        color: var(--text-main);
      }

      & span {
        @extend .text-20-600;
        color: var(--accent-yellow);
      }

      & img {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
