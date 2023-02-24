<script setup>
import UserAvatar from "@/components/icons/UserAvatar.vue";

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
</script>

<template>
  <div class="ol-home-user-card flex align-center column-gap-1">
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
  background-color: var(--gf-p-accent);
  height: 70px;
  padding: 10px 16px;
  border-radius: 8px;
}

.ol-home-username {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: right;
  color: var(--gf-p-primary-color);
}

.ol-home-userid {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--gf-p-gray-2);
}
</style>
