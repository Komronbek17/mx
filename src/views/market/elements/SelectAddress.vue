<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const props = defineProps({
  addressList: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const address = reactive({
  select: null,
});

function getHomeLocation(adds) {
  let zipCode = "";
  if (adds?.address) {
    zipCode += adds.address;
  }
  if (adds?.apartment) {
    zipCode += adds.apartment;
  }
  if (adds?.entrance) {
    zipCode += adds.entrance;
  }
  if (adds?.floor) {
    zipCode += adds.floor;
  }
  return zipCode;
}

function openAddNewAddressPage() {
  router.push({
    name: "checkout-address-create",
  });
}

const { t } = useI18n();
</script>

<template>
  <div class="address">
    <div class="layout-container">
      <div class="address-title">
        <p>{{ t("market_page.choose_address") }}</p>
        <!--        <router-link :to="{ name: 'market-form' }">{{ t("add") }}</router-link>-->
      </div>
    </div>

    <div class="address-items">
      <div
        class="address-item"
        v-for="direction in props.addressList"
        :key="direction.id"
      >
        <label class="d-flex align-start">
          <input
            name="radio"
            type="radio"
            :value="direction.id"
            v-model="address.select"
          />
          <div class="input-round">
            <div class="d-flex flex-column align-start">
              <h5>{{ direction.name }}</h5>
              <p>{{ getHomeLocation(direction) }}</p>
            </div>
          </div>
          <div class="address-controller">
            <router-link :to="{ name: 'market-form' }">
              <img src="@/assets/images/market-settings.svg" alt="" />
            </router-link>
          </div>
        </label>
      </div>
    </div>
    <!--      <h3 class="no-address_title">Нет адреса</h3> -->
    <button style="color: red" @click="openAddNewAddressPage">
      Добавить новый адрес
    </button>
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
