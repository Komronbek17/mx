<script setup>
import { reactive, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useToast } from "vue-toastification";

import { isArray } from "@/utils/inspect.util";
import { coinApi } from "@/services/coin.service";
import { locationApi } from "@/services/location.service";
import { WebAppController } from "@/utils/telegram/web.app.util";
import { loadingComposable } from "@/composables/loading.composable";
import { MainButtonController } from "@/utils/telegram/main.button.controller";
import AppLoader from "@/components/elements/loader/AppLoader.vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import InputSelectBySheet from "@/components/elements/input/InputSelectBySheet.vue";

const location = reactive({
  cityOptions: [],
  regionOptions: [],
});

const toast = useToast();

const { loading, startLoading, finishLoading } = loadingComposable();

const { validate } = useForm();

const { value: region, errorMessage: regionErrorMessage } = useField(
  "olAdsRegion",
  yup.object().required().label("Region")
);

const { value: city, errorMessage: cityErrorMessage } = useField(
  "olAdsDistrict",
  yup.object().required().label("District")
);

const { value: address, errorMessage: addressErrorMessage } = useField(
  "olAdsAddress",
  yup.string().required().label("Address")
);

const { value: entrance, errorMessage: entranceErrorMessage } = useField(
  "olAdsEntrance",
  yup.string().nullable().notRequired().label("Entrance")
);

const { value: floor, errorMessage: floorErrorMessage } = useField(
  "olAdsFloor",
  yup.string().nullable().notRequired().label("Floor")
);

const { value: apartment, errorMessage: apartmentErrorMessage } = useField(
  "olAdsApartment",
  yup.string().nullable().notRequired().label("Apartment")
);

const { value: comment, errorMessage: commentErrorMessage } = useField(
  "olAdsComment",
  yup.string().nullable().notRequired().label("Comment")
);

watch(region, (nRegion) => {
  if (nRegion?.id) {
    fetchCities({ regionId: nRegion?.id });
  }
});

async function fetchRegions() {
  try {
    const response = await locationApi.regionFindAll({ body: {} });
    location.regionOptions = response.data.result;
  } catch (e) {
    toast.error(e?.response.data.message ?? e.message);
  }
}

async function fetchCities({ regionId }) {
  try {
    const response = await locationApi.cityFindAll({
      body: { region_id: regionId },
    });
    location.cityOptions = response.data.result;
  } catch (e) {
    toast.error(e?.response.data.message ?? e.message);
  }
}

async function init() {
  try {
    // startLoading();
    await Promise.allSettled([fetchRegions()]);
  } finally {
    finishLoading();
  }
}

async function createAddress() {
  const { valid } = await validate();
  if (valid) {
    try {
      startLoading();
      const response = await coinApi.addressCreate({
        body: {
          region_id: region.id,
          city_id: city.id,
          address: address.value,
          entrance: entrance.value,
          floor: floor.value,
          apartment: apartment.value,
          comment: comment.value,
        },
      });

      console.log("response", response);
    } catch (e) {
      if (e?.response?.data?.message) {
        const { message } = e.response.data;
        if (isArray(message) && message.length) {
          toast.error(message[0]);
        } else {
          toast.error(message);
        }
      } else {
        toast.error(e.message);
      }
    } finally {
      finishLoading();
    }
  }
}

WebAppController.ready();
MainButtonController.run();
MainButtonController.setText("Create Address");
MainButtonController.onClick(createAddress);
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(createAddress);
});

init();
</script>

<template>
  <div class="ol-address-create">
    <app-loader :active="loading" />
    <h3>ДОБАВЛЕНИЕ АДРЕСА</h3>
    <div>
      <input-select-by-sheet
        label="name"
        v-model="region"
        :options="location.regionOptions"
      />
      <span v-if="regionErrorMessage" class="error-message d-block mt-0-5">
        {{ regionErrorMessage }}
      </span>
    </div>
    <div>
      <input-select-by-sheet
        label="name"
        v-model="city"
        :options="location.cityOptions"
      />
      <span v-if="cityErrorMessage" class="error-message d-block mt-0-5">
        {{ cityErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="address" label="Address" />
      <span v-if="addressErrorMessage" class="error-message d-block mt-0-5">
        {{ addressErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="entrance" label="Entrance" />
      <span v-if="entranceErrorMessage" class="error-message d-block mt-0-5">
        {{ entranceErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="floor" label="Floor" />
      <span v-if="floorErrorMessage" class="error-message d-block mt-0-5">
        {{ floorErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="apartment" label="Apartment" />
      <span v-if="apartmentErrorMessage" class="error-message d-block mt-0-5">
        {{ apartmentErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="comment" label="Comment" />
      <span v-if="commentErrorMessage" class="error-message d-block mt-0-5">
        {{ commentErrorMessage }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-address-create {
  color: var(--gf-text-33);
  max-width: calc(100% - 2rem);
  margin: 2rem auto;
}

.error-message {
  color: #eb5757;
}
</style>
