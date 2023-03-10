<script setup>
import UserAvatar from "@/components/icons/UserAvatar.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  userFullName: {
    type: String,
    required: true,
  },
  userUniqueId: {
    type: String,
    required: true,
  },
});

const router = useRouter();

function openUserAccount() {
  router.push({
    name: "profile",
  });
}
</script>

<template>
  <div
    @click="openUserAccount"
    class="ol-home-user-card flex align-center column-gap-1"
  >
    <div>
      <user-avatar />
    </div>
    <div class="flex flex-column">
      <span class="ol-home-username">
        {{ props.userFullName }}
      </span>
      <span class="ol-home-userid"> ID:{{ props.userUniqueId }} </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-home-user-card {
  background-color: var(--accent-gray);
  height: 70px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.ol-home-username {
  @extend .heading-3;
  text-align: right;
  color: var(--text-main);
}

.ol-home-userid {
  @extend .text-14-400;
  color: var(--text-secondary);
}
</style>
