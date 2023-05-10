import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
    install: (app) => {

        app.use(Toast)
    }
}

