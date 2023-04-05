import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { chatApi } from "@/services/chat.service";

export const useChatStore = defineStore("chat", () => {
  const chatState = reactive({
    messages: {
      items: [],
      pagination: {
        current: 1,
        next: 2,
        perPage: 10,
        previous: 0,
        totalItem: 15,
        totalPage: 0,
      },
    },
  });

  const messages = computed(() => chatState.messages);

  async function getMessages({ page = 1, perPage = 10 }) {
    const response = await chatApi.messages({
      params: {
        page,
        limit: perPage,
      },
    });
    console.log(response);
  }

  return {
    messages,
    getMessages,
  };
});
