<script setup>
import ChatMessage from "@/views/chat/components/ChatMessage.vue";
import { useChatStore } from "@/stores/chat.store";
const chatStore = useChatStore();

chatStore.getMessages({});
</script>

<template>
  <div class="ol-chat-interface">
    <chat-message />
  </div>
</template>

<style lang="scss" scoped>
.ol-chat-interface {
  border: 2px solid red;
  padding: 1rem;
}
</style>
