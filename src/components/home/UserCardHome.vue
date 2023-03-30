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
  userAvatar: {
    type: String,
    default: null,
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
    <div class="ol-home-avatar">
      <img :src="props.userAvatar" alt="" />
    </div>
    <div class="flex flex-column">
      <span class="ol-home-username">
        {{ props.userFullName }}
      </span>
      <span class="ol-home-userid"> ID: {{ props.userUniqueId }} </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-home-user-card {
  background-color: var(--gf-accent-bg);
  height: 70px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.ol-home-username {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: right;
  color: var(--gf-text-09);
}

.ol-home-userid {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--gf-text-gray);
}

.ol-home-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
