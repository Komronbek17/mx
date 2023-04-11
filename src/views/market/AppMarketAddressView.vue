<script setup>
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { coinApi } from "@/services/market.service";
import { onMounted, ref } from "vue";
import { loadingComposable } from "@/composables/loading.composable";
import AppLoader from "@/components/elements/loader/AppLoader.vue";

const { t } = useI18n();
const toast = useToast();
const addresses = ref([]);
const {
  loading: isFetching,
  startLoading,
  finishLoading,
} = loadingComposable();
const getAddresses = async () => {
  try {
    const body = {
      page: 1,
      limit: 10,
    };

    await coinApi.fetchAddresses(body).then((response) => {
      console.log(response);
      addresses.value = response.data.result;
    });
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};

onMounted(async () => {
  startLoading();
  try {
    await getAddresses();
  } finally {
    finishLoading();
  }
});
</script>

<template>
  <div class="address">
    <div class="layout-container">
      <app-loader :active="isFetching" />
      <div class="address-title">
        <p>{{ t("market_page.choose_address") }}</p>
        <router-link :to="{ name: 'market-form' }">{{ t("add") }}</router-link>
      </div>
    </div>

    <div class="address-items">
      <div class="address-item">
        <label class="d-flex align-start">
          <input type="radio" name="radio" checked />
          <div class="input-round">
            <div class="d-flex flex-column align-start">
              <h5>asd</h5>
              <p>asd</p>
            </div>
          </div>
          <div class="address-controller">
            <router-link :to="{ name: 'market-form' }">
              <img src="@/assets/images/market-settings.svg" alt="" />
            </router-link>
          </div>
        </label>
      </div>
      <h3 class="no-address_title">Нет адреса</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.address {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;

    & p {
      font-size: 15px;
      font-weight: 600;
      color: var(--gf-text-33);
      text-transform: uppercase;
    }

    & a {
      font-size: 15px;
      font-weight: 600;
      background: var(--gf-green-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  &-item label {
    padding: 0 16px 0 10px;

    //&:hover {
    //  background-color: var(--gf-basket-product-image-bg);
    //}
  }

  &-controller {
    cursor: pointer;
  }
}

label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
  /* Accessible outline */
  /* Remove comment to use */
  /*
    &:focus-within {
        outline: .125em solid $primary-color;
    }
  */
  input {
    position: absolute;
    left: -9999px;

    &:checked + div {
      &:before {
        box-shadow: inset 0 0 0 0.4375em #01a8ff;
      }
    }
  }

  .input-round {
    display: flex;
    align-items: center;
    padding: 0.75rem 0.75em 0.75rem 0.375em;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;

    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: transparent;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 1em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em var(--gf-text-secondary-gray-2x);
    }

    & h5 {
      font-size: 15px;
      font-weight: 600;
      color: var(--gf-text-33);
      margin-bottom: 6px;
    }

    & p {
      font-size: 14px;
      font-weight: 400;
      color: var(--gf-text-secondary-gray-2x);
    }
  }
}

.no-address_title {
  color: var(--gf-text-33);
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

// Codepen spesific styling - only to center the elements in the pen preview and viewport
//.container {
//  position: absolute;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//  width: 100%;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  padding: 20px;
//}
// End Codepen spesific styling
</style>
