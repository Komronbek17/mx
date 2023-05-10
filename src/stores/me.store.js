import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMeStore = defineStore("me", () => {
  const me = ref({});

  function initMe({ meCtx }) {
    me.value = meCtx;
    return meCtx;
  }

  const getMe = computed(() => me.value);

  const meUniqueId = computed(() => me.value["id"]);

  return {
    me,
    getMe,
    meUniqueId,
    initMe,
  };
});
