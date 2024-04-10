<script setup>
// import { useTelegramStore } from "@/stores/telegram.store";
//
// const telegramStore = useTelegramStore();
//x1
// console.log(telegramStore.webApp, "asd");
// telegramStore.webApp.showPopup.PopupButton;

// import axios from "axios";
//
// const { data } = await axios.post(
//   "https://goldenfish.1it.uz/gwt/v2/notification/findAll"
// );
// console.log("data", data);

import { onMounted, ref } from "vue";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { notificationApi } from "@/services/notification.service";

import NotificationItem from "@/components/notification/NotificationItem.vue";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
// import { newsApi } from "@/services/news.service";
import AppBottomSheet from "@/components/elements/bottomSheet/AppBottomSheet.vue";
import AppOrderPreview from "@/views/profile/order-history/AppOrderPreview.vue";
import BotCloseIcon from "@/components/icons/BotCloseIcon.vue";

const isFetching = ref(false);
const isItemFetching = ref(false);
const notificationItemSheet = ref(null);
const previewItem = ref({
  id: 0,
  title: "",
  description: "",
  link: "",
  link_type: "",
  created_at: "",
  service: "",
  image: "",
  is_viewed: true,
});

const items = ref([]);
const pagination = ref({
  current: 1,
  perPage: 10,
  next: 2,
});

function openBottomSheet() {
  notificationItemSheet.value.open();
}

function closeBottomSheet() {
  notificationItemSheet.value.close();

  pagination.value.current = 1;
  getNotifications();
}

async function viewDetails(id) {
  try {
    isItemFetching.value = true;
    openBottomSheet();

    previewItem.value = {
      id: 0,
      title: "",
      description: "",
      link: "",
      link_type: "",
      created_at: "",
      service: "",
      image: "",
      is_viewed: true,
    };

    const response = await notificationApi.getOne({ notification_id: id });
    previewItem.value = response.data.result;
  } finally {
    isItemFetching.value = false;
  }
}

async function getNotifications() {
  try {
    isFetching.value = true;

    if (pagination.value.next === 0) {
      return;
    }

    const response = await notificationApi.getAll({
      page: pagination.value.current,
      limit: pagination.value.perPage,
    });

    // const body = {
    //   method: "news.get_all",
    //   params: {
    //     page: pagination.value.current,
    //     limit: pagination.value.perPage,
    //   },
    // };
    //
    // const response = await newsApi.fetchNews(body);

    items.value = [...items.value, ...response.data.result];
    pagination.value = response.data.pagination;
  } finally {
    isFetching.value = false;
  }
}

function loadMore() {
  setTimeout(async () => {
    pagination.value.current++;
    await getNotifications();
  }, 500);
}

WebAppController.ready();

onMounted(async () => {
  const listElm = document.getElementById("infinite-list");
  listElm.addEventListener("scroll", () => {
    if (listElm.scrollTop + listElm.clientHeight + 10 >= listElm.scrollHeight) {
      loadMore();
    }
  });
});

getNotifications();
</script>

<template>
  <div
    class="notification"
    id="infinite-list"
    style="height: 90vh; overflow-y: scroll"
  >
    <app-loader :active="isFetching" />
    <div class="layout-container">
      <div class="notification-date">
        <NotificationItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @click="viewDetails(item.id)"
        />
      </div>
    </div>

    <app-bottom-sheet
      height="100%"
      ref="notificationItemSheet"
      :click-to-close="true"
    >
      <app-loader :active="isItemFetching"></app-loader>

      <div style="color: black">
        <div class="order-header">
          <h3 class="order-header_title">TITLE</h3>
          <button class="order-header_close">
            <BotCloseIcon
              @click="closeBottomSheet"
              size="28"
              fill="var(--text-main)"
            />
          </button>
        </div>
        <div>{{ previewItem.title }}</div>
        <div>{{ previewItem.description }}</div>
      </div>
    </app-bottom-sheet>
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
