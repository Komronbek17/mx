<script setup>
import UserAvatar from "@/components/icons/UserAvatar.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();

const emit = defineEmits(["send-refresh"]);

const props = defineProps({
  userFullName: {
    type: String,
    required: true,
  },
  userUniqueId: {
    type: [String, Number],
    required: true,
  },
  userAvatar: {
    type: String,
    default: "",
  },
  refreshLevel: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

function openUserAccount() {
  if (!props.refreshLevel) {
    router.push({
      name: "profile",
    });
  }
}
</script>

<template>
  <div @click="openUserAccount" class="ol-home-user-card column-gap-1">
    <div class="ol-home-user-card-content column-gap-1">
      <div class="ol-home-avatar">
        <img v-if="userAvatar" :src="userAvatar" alt="avatar" />
        <div v-else>
          <user-avatar />
        </div>
      </div>
      <div class="flex flex-column" style="row-gap: 0.25rem">
        <span class="ol-home-username">
          {{ props.userFullName }}
        </span>
        <span class="ol-home-userid"> ID: {{ props.userUniqueId }} </span>
      </div>
    </div>
    <div v-if="refreshLevel" class="ol-home__action">
      <div @click="emit('send-refresh')" class="ol-home__action-button">
        <img src="@/assets/images/change-profile-white.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-home-user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--gf-accent-bg);
  height: 70px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  &-content {
    display: flex;
    align-items: center;
  }
}

.ol-home__action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  z-index: 2;

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 40px;
    max-width: 40px;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background: var(--gf-blue-gradient-01);

    img {
      width: 20px;
      height: 20px;
    }
  }
}

.ol-home-username {
  @extend .text-20-600;
  min-height: 28px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 180px;
  letter-spacing: -0.4px;
  //text-align: right;
  color: var(--gf-text-09);
}

.ol-home-userid {
  @extend .text-14-400;
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
