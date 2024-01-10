import AppFlash from "@/views/flash/AppFlash.vue";
import AppFlashSuccessfully from "@/views/flash/AppFlashSuccessfully.vue";
import AppFlashWaiting from "@/views/flash/AppFlashWaiting.vue";

export const flashRoutes = [
  {
    path: "/flash",
    name: "flash",
    component: AppFlash,
  },
  {
    path: "/flash-successfully",
    name: "flash-successfully",
    component: AppFlashSuccessfully,
  },
  {
    path: "/flash-waiting",
    name: "flash-waiting",
    component: AppFlashWaiting,
  },
];
