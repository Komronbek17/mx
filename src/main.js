import {createApp} from "vue";
import {createPinia} from "pinia";
import {VueMaskDirective} from "v-mask";

import App from "./App.vue";
import router from "./routes";
import {i18n} from "@/locales";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import myToast from "@/libs/my-toast";


import "@/assets/scss/main.scss";
import ToastErrorIcon from "@/components/icons/ToastErrorIcon.vue";



const app = createApp(App);

app.component('toast-error', ToastErrorIcon)
app.component('toast-success', ToastErrorIcon)

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
app.use(myToast);

app.mount("#app");
