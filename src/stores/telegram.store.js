import {computed, ref} from "vue";
import {defineStore} from "pinia";

export const useTelegramStore = defineStore("telegram", () => {
    const webApp = ref({
        initDataUnsafe: {
            user: {
                id: "",
                first_name: "",
                last_name: "",
                username: "",
                language_code: "",
            },
        },
    });

    const tUserId = computed(() => webApp.value.initDataUnsafe.user.id);
    const tUser = computed(() => webApp.value.initDataUnsafe.user);
    const tUserFullName = computed(
        () => tUser.value?.first_name + " " + tUser.value?.last_name
    );

    function initWebApp({tApp}) {
        webApp.value = tApp;
    }

    function initApp({webApp: tApp}) {
        initWebApp({tApp});
    }

    return {
        webApp,
        tUserId,
        tUser,
        tUserFullName,
        initApp,
    };
});
