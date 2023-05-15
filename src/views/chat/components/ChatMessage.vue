<script setup>
import { computed } from "vue";
import { isNUNEZ } from "@/utils/inspect.util";
import { addZero, dateProperties } from "@/utils/date.formatter";

const props = defineProps({
  message: {
    type: Object,
    default: () => ({
      id: 1216,
      parent: {
        id: 804,
        message: "reply to Hamid Umarov",
        user: {
          id: 910444,
          name: "Hamid Umarov",
          phone: "998936852393",
          avatar: {
            id: 53,
            path: "https://fitgroup-dev.s3.eu-west-3.amazonaws.com/uploads/avatars/0G7HJcPOC9CMiQK5muNuuCXN1QASDRkRwdcEmYBK.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAX2ZEDBOLJY4LES3P%2F20230403%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230403T084208Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=4dc5438c290c45da61e897f34e1e79492b215fa0a733e19342d7bc7415857710",
            name: "gamer (1).png",
            size: "21773",
            extension: "png",
          },
        },
        file: {
          id: 569,
          path: "https://fitgroup-dev.s3.eu-west-3.amazonaws.com/uploads/chats/Xp1Io5PQ6bWwN4DvsOPtVuI06Yks35tWCe7fctrp.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAX2ZEDBOLJY4LES3P%2F20230403%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230403T084208Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=fd7f4db5efbe98994480e3e51f5bf861ce429cf211d82ed76798ae785ea66dcb",
          name: "bceb8dd0cede7233e40c601d733b11c4.jpg",
          size: "219222",
          extension: "jpg",
        },
      },
      user: {
        id: 21,
        name: " ",
        phone: "998770002835",
        avatar: null,
      },
      user_type: "staff",
      message: "just message",
      file: null,
      created_at: "2023-04-03 08:42:03",
      updated_at: "2023-04-03 08:42:03",
    }),
  },
});

const hasFile = computed(() => isNUNEZ(props.message.file));
const hasParentFile = computed(
  () => isNUNEZ(props.message.parent) && isNUNEZ(props.message.parent.file)
);
const hasMessage = computed(() => isNUNEZ(props.message.message));
const hasParent = computed(() => isNUNEZ(props.message.parent));
const fromStaff = computed(() => props.message.user_type === "staff");
const receivedTime = computed(() => {
  const { minutes, hours } = dateProperties(props.message.created_at, "string");
  return addZero(hours) + ":" + addZero(minutes);
});
</script>

<template>
  <div class="message__wrapper" :class="{ message__from__staff: fromStaff }">
    <div class="message__content">
      <span class="message__parent" v-if="hasParent">
        <img
          v-if="hasParentFile"
          alt="image not found"
          class="message__main__image"
          :src="props.message.parent.file.path"
        />
      </span>
      <span class="message__main">
        <img
          v-if="hasFile"
          class="message__main__image"
          :src="props.message.file.path"
          alt="image not found"
        />
        <span v-if="hasMessage">
          {{ props.message.message }}
        </span>
      </span>
    </div>
    <span class="message__time"> {{ receivedTime }} </span>
  </div>
</template>

<style lang="scss" scoped>
.message__wrapper {
  display: flex;
  flex-direction: column;
  width: min-content;
  color: #ffffff;
  margin-left: auto;
}

.message__content {
  background: var(--gf-blue-gradient-01);
  border-radius: 16px 16px 0 16px;
  padding: 12px;
}

.message__main__image {
  min-width: 200px;
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 16px 16px 0 16px;
}

.message__time {
  @extend .text-10-400;
  text-align: right;
  color: var(--gf-text-secondary-gray);
  margin-top: 2px;
}
</style>
