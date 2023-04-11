import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useSignStore = defineStore("sigIn", () => {
  const signPhone = ref("+998");
  const getSignPhone = computed(() => signPhone.value);
  function updateSignPhone(number) {
    signPhone.value = number;
  }
  return {
    signPhone,
    getSignPhone,
    updateSignPhone,
  };
});
