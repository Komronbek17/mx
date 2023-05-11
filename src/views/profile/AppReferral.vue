<script setup>
import {useRoute} from "vue-router";
import {WebAppController} from "@/utils/telegram/web.app.util";
import {referralService} from "@/services/referral.service";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {loadingComposable} from "@/composables/loading.composable";
import {useToast} from "vue-toastification";
import {useUserStore} from "@/stores/user.store";

import userAvatar from "@/assets/images/profile-image.svg";

const route = useRoute();
const toast = useToast()

// const ReferralBonus = defineAsyncComponent(() => {
//   return import("@/views/profile/AppReferralBonus.vue");
// });

const ReferralIndex = defineAsyncComponent(() => {
  return import("@/views/profile/AppReferralIndex.vue");
});


const {user, initUser} = useUserStore();


const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();


// const referralTabs = [
//   {
//     name: 'Рефералы',
//     route: 'referral-index',
//     component: ReferralIndex
//   },
//   {
//     name: 'Бонусы',
//     route: 'referral-bonus',
//     component: ReferralBonus
//   }
// ]

// const activeTab = ref(referralTabs[0])


// function selectTab(tab) {
//   activeTab.value = tab
// }


const referralData = ref({
  link: null,
  coins: 0,
  count: 0
});
const relatedReferralData = ref([]);


const pagination = ref({
  current: 1,
  limit: 10,
});

const loading = ref(false);


async function fetchReferral() {
  try {
    const {data} = await referralService.getLink();
    referralData.value = data.result
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  }
}

function loadMore() {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      pagination.value.current++;
      fetchRelatedReferrals();
    }
    loading.value = false;
  }, 500);
}


const checkScrollFunction = () => {
  const listElm = document.getElementById("infinite-list");
  // eslint-disable-next-line no-unused-vars
  listElm.addEventListener("scroll", (e) => {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      if (pagination.value.next) {
        loadMore();
      }
    }
  });
  // Initially load some items.
  loadMore();
};

async function fetchRelatedReferrals() {
  try {
    const body = {
      page: pagination.value.current,
      limit: pagination.value.limit,
    };
    const {data} = await referralService.getRelatedReferrals(body);
    relatedReferralData.value = [...data.result, ...relatedReferralData.value]
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  }
}

onMounted(async () => {
  try {
    startLoading();
    if (!(user && user.id)) {
      await initUser();
    }
    await Promise.allSettled([await fetchReferral(), await fetchRelatedReferrals()]);
    checkScrollFunction()
  } finally {
    finishLoading();
  }
})


WebAppController.ready();
</script>

<template>
  <div class="referral">
    <div class="layout-container">
      <div class="referral-user">
        <div class="referral-image">
          <img :src="user?.avatar || userAvatar" alt="avatar"/>
        </div>

        <p class="referral-name">{{ user.fullName }}</p>
        <!--        <span class="referral-score">120 баллов</span>-->
      </div>

      <!--      <div class="referral-tabs">-->
      <!--        <button-->
      <!--            v-for="tab in referralTabs"-->
      <!--            :key="tab.route"-->
      <!--            class="referral-tab"-->
      <!--            :class="{'router-link-active':activeTab.route === tab.route}"-->
      <!--            @click="selectTab(tab)"-->
      <!--        >-->
      <!--          <span class="button-text">{{ tab.name }}</span>-->
      <!--        </button>-->
      <!--      </div>-->
      <!--      <component-->
      <!--          :is="activeTab.component"-->
      <!--          :property="referralData"-->
      <!--          :related-property="relatedReferralData"-->
      <!--      />-->

      <referral-index :property="referralData" :related-list="relatedReferralData" :loading="loading"/>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.referral {
  &-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

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

  &-score {
    font-weight: 600;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.4px;
    color: #00cb6a;
  }

  &-tabs {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f5f5;
    border-radius: 72px;
    height: 50px;
    padding: 4px 8px;
    margin: 0 auto 1rem;
  }

  &-tab {
    font-weight: 600;
    font-size: 17px;
    line-height: 129%;
    text-align: center;
    color: #797d81;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 1rem;

    &.router-link-active {
      color: #fff !important;
      background: linear-gradient(107.32deg, #4adaff -22.08%, #0062ca 122.03%);
      border-radius: 72px;
    }
  }
}
</style>
