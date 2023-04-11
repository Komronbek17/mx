import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueMaskDirective } from "v-mask";

import App from "./App.vue";
import router from "./routes";
import { i18n } from "@/locales";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Toast from "vue-toastification";

import "./assets/scss/main.scss";
import "vue-toastification/dist/index.css";

const app = createApp(App);

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind,
};

const Pinia = createPinia();

app.directive("mask", vMaskV3);

app.component("v-select", vSelect);
app.use(Pinia);
app.use(router);
app.use(i18n);
app.use(Toast);

app.mount("#app");
