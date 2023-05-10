<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  addressList: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Object],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();

const router = useRouter();

const addressValue = computed({
  get() {
    return props.modelValue;
  },
  set(nValue) {
    emit("update:modelValue", nValue);
  },
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
            :value="direction"
            v-model="addressValue"
          />
          <div class="input-round">
            <h5>{{ direction.name }}</h5>
            <div class="divider">
              <p>{{ getHomeLocation(direction) }}</p>
              <div class="address-controller">
                <router-link :to="{ name: 'market-form' }">
                  <img src="@/assets/images/market-settings.svg" alt="" />
                </router-link>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>

    <slot></slot>

    <!--      <h3 class="no-address_title">Нет адреса</h3> -->
    <div class="layout-container">
      <div class="flex justify-center">
        <button class="add-address" @click="openAddNewAddressPage">
          <img src="@/assets/images/add-blue.svg" alt="" />
          <span>{{ $t("market_page.add_new_address") }}</span>
        </button>
      </div>
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

  &-item {
    position: relative;
    padding: 0 1rem;

    &::after {
      content: "";
      position: absolute;
      width: 81%;
      height: 1px;
      top: 100%;
      right: 1rem;
      background-color: var(--gf-hover-bg);
    }

    &:last-child::after {
      display: none;
    }
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
    padding: 0.75rem 0.75em 0.75rem 0;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;
    width: 100%;

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

.error-message {
  color: #eb5757;
}

.add-address {
  @extend .text-16-500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #00aee8;
  color: #00aee8;
  width: 100%;
  height: 44px;
  border-radius: 8px;

  & img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-right: 10px;
  }
}

.divider {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
