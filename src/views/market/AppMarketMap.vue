<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import {ref} from "vue";

const addressDetails = ref({
  addressName: {
    id: "address",
    label: "Адрес",
    type: "text",
    value: "",
  },
  addressEntrance: {
    id: "entrance",
    label: "Подьезд",
    type: "number",
    value: "",
  },
  addressFloor: {
    id: "floor",
    label: "Этаж",
    type: "number",
    value: "",
  },
  addressApartment: {
    id: "apartment",
    label: "Кварт.",
    type: "number",
    value: "",
  },
  addressComment: {
    id: "comment",
    label: "Комментарий",
    type: "text",
    value: "",
  },
  location: {
    latitude: 69.2700806,
    longitude: 41.3006733,
  },
});
const center = ref({ lat: 41.3103107, lng: 69.2779284 });
const markerOptions = ref({
  position: center.value,
  clickable: true,
  draggable: true,
});

function changeLocation(location) {
  const newPosition = {
    latitude: location.latLng.lat(),
    longitude: location.latLng.lng(),
  };
  center.value = {
    lat: location.latLng.lat(),
    lng: location.latLng.lng(),
  };
  addressDetails.value.location = newPosition;
}
</script>

<template>
  <div class="map">
    <div class="layout-container">
      <GoogleMap
          :center="center"
          :zoom="15"
          api-key="AIzaSyDIm3DnxGMLuv9LUj_CaCQqxtnJ2i2btps"
          style="width: 100%; height: 450px; border-radius: 8px"
      >
        <Marker :options="markerOptions" @dragend="changeLocation($event)" />
      </GoogleMap>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .mapdiv {
  border-radius: 8px;
}
</style>
