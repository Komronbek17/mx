<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { hasOwnProperty } from "@/utils/object.util";
import { useRouter } from "vue-router";

const props = defineProps({
  clientList: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Object],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);
const router = useRouter();

const { t } = useI18n();

const addressValue = computed({
  get() {
    return props.modelValue;
  },
  set(nValue) {
    emit("update:modelValue", nValue);
  },
});

function clientFullName(client) {
  let name = "";
  if (hasOwnProperty(client, "first_name")) {
    name += client.first_name;
  }

  if (hasOwnProperty(client, "last_name")) {
    name += " " + client.last_name;
  }

  return name;
}

function openAddNewAddressPage() {
  router.push({
    name: "checkout-client-create",
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
        v-for="client in props.clientList"
        :key="client.id"
      >
        <label class="d-flex align-start" :for="'labelClient' + client.id">
          <input
            name="ol-radio-client"
            type="radio"
            :id="'labelClient' + client.id"
            :value="client"
            v-model="addressValue"
          />
          <span class="input-round">
            <span class="d-flex flex-column align-start">
              <span>{{ clientFullName(client) }}</span>
            </span>
          </span>
          <span class="address-controller">
            <router-link
              :to="{
                name: 'checkout-client-update',
                params: {
                  id: client.id,
                },
              }"
            >
              <img src="@/assets/images/market-settings.svg" alt="" />
            </router-link>
          </span>
        </label>
      </div>
    </div>

    <slot></slot>

    <!--      <h3 class="no-address_title">Нет адреса</h3> -->
    <div
      class="flex justify-center"
      @click="openAddNewAddressPage"
      style="
        border: 1px solid black;
        padding: 1rem;
        margin: 1rem;
        cursor: pointer;
      "
    >
      <button style="color: var(--gf-text-33)">
        Добавить нового получателя
      </button>
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

    &:checked + span {
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

    & span {
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
