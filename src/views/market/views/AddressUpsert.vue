<script setup>
import { computed, reactive, watch } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
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
import { useTelegramStore } from "@/stores/telegram.store";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();

const location = reactive({
  cityOptions: [],
  regionOptions: [],
});

const telegramStore = useTelegramStore();
const { t } = useI18n();
const toast = useToast();

const { loading, startLoading, finishLoading } = loadingComposable();
const clientUnique = computed(() => route.params.id);
const isUpdatingRole = computed(() => route.name === "checkout-address-update");

const { validate, setValues } = useForm();

const { value: region, errorMessage: regionErrorMessage } = useField(
  "olAdsRegion",
  yup
    .object()
    .required(t("yup.required", { _field_: t("market_page.region") }))
    .label("Region")
);

const { value: city, errorMessage: cityErrorMessage } = useField(
  "olAdsDistrict",
  yup
    .object()
    .required(t("yup.required", { _field_: t("market_page.city") }))
    .label("District")
);

const { value: address, errorMessage: addressErrorMessage } = useField(
  "olAdsAddress",
  yup
    .string()
    .required(t("yup.required", { _field_: t("market_page.address") }))
    .label("Address")
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

async function getAddressDetails() {
  try {
    startLoading();
    const {
      data: { result: adds },
    } = await coinApi.addressFinOne({
      params: { id: clientUnique.value },
    });

    await Promise.allSettled([
      fetchRegions(),
      fetchCities({ regionId: adds.region.id }),
    ]);

    const vs = {
      olAdsAddress: adds.address,
      olAdsEntrance: adds.entrance,
      olAdsFloor: adds.floor,
      olAdsApartment: adds.apartment,
      olAdsComment: adds.comment,
    };

    const region = location.regionOptions.find(
      (rOpt) => rOpt["id"] === adds.region.id
    );

    if (region) {
      vs.olAdsRegion = region;
    }

    const district = location.cityOptions.find(
      (cOpt) => cOpt["id"] === adds["city"]["id"]
    );

    if (district) {
      vs.olAdsDistrict = district;
    }

    setValues({ ...vs });
  } catch (e) {
    toast.error(e?.response?.data?.message ?? e.message);
  } finally {
    finishLoading();
  }
}

async function init() {
  try {
    if (isUpdatingRole.value) {
      startLoading();
      await getAddressDetails();
    }
    await Promise.allSettled([fetchRegions()]);
  } finally {
    finishLoading();
  }
}

function getBodyCtx() {
  return {
    is_default: true,
    name: telegramStore.tUserFullName,
    region_id: region.value.id,
    city_id: city.value.id,
    address: address.value,
    entrance: entrance.value,
    floor: floor.value,
    apartment: apartment.value,
    comment: comment.value,
  };
}

async function saveAddressRecord() {
  const { valid } = await validate();
  if (valid) {
    if (isUpdatingRole.value) {
      await updateAddressHandler({
        id: route.params.id,
        ...getBodyCtx(),
      });
    } else {
      await createAddressHandler({
        ...getBodyCtx(),
      });
    }
  }
}

async function createAddressHandler(bCtx) {
  const { valid } = await validate();
  if (valid) {
    try {
      startLoading();
      const response = await coinApi.addressCreate({
        body: bCtx,
      });

      if (response) {
        await router.push({
          name: "market-checkout",
        });
      }
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

async function updateAddressHandler(bodyCtx) {
  try {
    startLoading();
    await coinApi.addressUpdate({
      body: bodyCtx,
    });
    await router.push({
      name: "market-checkout",
    });
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

WebAppController.ready();
MainButtonController.run();
MainButtonController.setText(`${t("add")}`);
MainButtonController.onClick(saveAddressRecord);
onBeforeRouteLeave(() => {
  MainButtonController.makeInvisible();
  MainButtonController.offClick(saveAddressRecord);
});

init();
</script>

<template>
  <div class="ol-address-create">
    <app-loader :active="loading" />
    <h3>
      {{
        t(
          isUpdatingRole
            ? "market_page.update_address_title"
            : "market_page.create_address_title"
        )
      }}
    </h3>
    <div>
      <input-select-by-sheet
        :input-label="t('market_page.region')"
        :choose-text="t('market_page.choose')"
        label="name"
        input-name="OlDistrictOptions"
        v-model="region"
        :options="location.regionOptions"
      />
      <span v-if="regionErrorMessage" class="error-message d-block mt-0-5">
        {{ regionErrorMessage }}
      </span>
    </div>
    <div>
      <input-select-by-sheet
        :input-label="t('market_page.city')"
        :choose-text="t('market_page.choose')"
        label="name"
        input-name="OlCityOptions"
        v-model="city"
        :options="location.cityOptions"
      />
      <span v-if="cityErrorMessage" class="error-message d-block mt-0-5">
        {{ cityErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="address" :label="t('market_page.address')" />
      <span v-if="addressErrorMessage" class="error-message d-block mt-0-5">
        {{ addressErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="entrance" :label="t('market_page.entrance')" />
      <span v-if="entranceErrorMessage" class="error-message d-block mt-0-5">
        {{ entranceErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="floor" :label="t('market_page.floor')" />
      <span v-if="floorErrorMessage" class="error-message d-block mt-0-5">
        {{ floorErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="apartment" :label="t('market_page.apartment')" />
      <span v-if="apartmentErrorMessage" class="error-message d-block mt-0-5">
        {{ apartmentErrorMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="comment" :label="t('market_page.comment')" />
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
