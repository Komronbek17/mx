import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { latest } from "@/services/latest.service";
import { useRouter } from "vue-router";

export const useFlashStore = defineStore("flashStore", () => {
  const STEPS_LENGTH = 6;
  const details = ref({
    balanceMin: 0,
    balanceUser: 0,
    stepStat: 0,
    stepMin: 0,
    stepMax: 0,
    flashGifts: [],
    fetching: false,
  });

  const sending = ref(false);

  const packages = ref([]); /*{
    name:string,
    type:string,
    cost:number,
    qty:number
  }*/

  const toast = useToast();
  const router = useRouter();

  const hasReachedMin = computed(
    () => details.value.stepMin <= packages.value.length
  );

  const hasReachedMax = computed(
    () => details.value.stepMax <= packages.value.length
  );

  const total = computed(() => {
    let sum = 0;
    packages.value.forEach(({ cost }) => {
      sum += cost;
    });
    return sum;
  });

  const hasExceeded = computed(() => total.value > details.value.balanceUser);
  const neededAmount = computed(() => total.value - details.value.balanceUser);
  const isReadyToSubmit = computed(
    () => packages.value.length && hasReachedMin.value && !hasExceeded.value
  );

  function startFetching() {
    details.value.fetching = true;
  }

  function finishFetching() {
    details.value.fetching = false;
  }

  function addPackage(option) {
    if (!(hasReachedMax.value && sending.value)) {
      packages.value.push(option);
    }
  }

  function removePackage(option) {
    if (!sending.value) {
      const optionIndex = packages.value.findIndex(
        (p) => p.name === option.name
      );
      if (optionIndex !== -1) {
        packages.value.splice(optionIndex, 1);
      }
    }
  }

  function resetPackages() {
    packages.value = [];
    details.value.flashGifts = details.value.flashGifts.map((gift) => ({
      ...gift,
      selected: false,
    }));
  }

  function deselectPackage(packageItem) {
    packages.value = packages.value.filter((p) => p.name !== packageItem.name);
    const indexOfPackage = details.value.flashGifts.findIndex(
      (gift) => gift.name === packageItem.name
    );
    if (indexOfPackage !== -1) {
      details.value.flashGifts[indexOfPackage].selected = false;
    }
  }

  function sortByTypes(a, b) {
    const customOrder = ["internet", "sms", "coin"];

    const aTypeIndex = customOrder.indexOf(a.type);
    const bTypeIndex = customOrder.indexOf(b.type);

    // Compare by type first
    if (aTypeIndex !== bTypeIndex) {
      return aTypeIndex - bTypeIndex;
    }

    // If types are the same, compare by price
    return a.cost - b.cost;
  }

  async function fetchInfoItems({ userId }) {
    try {
      startFetching();
      const rsp = await latest.flash.panel({ id: userId });
      details.value.balanceMin = rsp.data.data.balanceMin;
      details.value.balanceUser = rsp.data.data.balanceUser;
      details.value.stepStat = rsp.data.data.stepStat;
      details.value.stepMin = rsp.data.data.stepMin;
      details.value.stepMax = rsp.data.data.stepMax;

      details.value.flashGifts = rsp.data.data.flashGifts
        .map((gift) => ({
          ...gift,
          selected: false,
        }))
        .sort(sortByTypes);
    } catch (e) {
      if (e?.response?.data?.statusCode === 423) {
        await router.push({
          name: "flash-successfully",
        });
      } else {
        toast.error(e?.response?.data?.message || e.message);
      }
    } finally {
      finishFetching();
    }
  }
  async function send({ userId }) {
    try {
      sending.value = true;
      await latest.flash.send({
        body: {
          user_id: userId,
          gifts: packages.value.map(({ name }) => name),
        },
      });
      if (packages.value.length < details.value.stepMax) {
        resetStore();
        await router.push({
          name: "home",
        });
      } else {
        resetStore();
        await router.push({
          name: "flash-successfully",
        });
      }

      resetStore();
    } catch (e) {
      resetStore();
      await router.push({
        name: "flash",
      });
      toast.error(e?.response?.data?.message || e.message);
    } finally {
      sending.value = false;
    }
  }

  function resetStore() {
    packages.value = [];

    details.value.balanceMin = 0;
    details.value.balanceUser = 0;
    details.value.stepStat = 0;
    details.value.stepMin = 0;
    details.value.stepMax = 0;
    details.value.flashGifts = [];
  }

  return {
    STEPS_LENGTH,
    total,
    details,
    packages,
    hasExceeded,
    neededAmount,
    hasReachedMax,
    hasReachedMin,
    isReadyToSubmit,
    sending,
    resetPackages,
    addPackage,
    removePackage,
    fetchInfoItems,
    send,
    resetStore,
    deselectPackage,
  };
});
