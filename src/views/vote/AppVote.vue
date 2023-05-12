<script setup>
import VoteProgress from "@/views/vote/VoteProgress.vue";
import VoteAnswers from "@/views/vote/VoteAnswers.vue";
import {computed, onMounted, ref} from "vue";
import {voteApi} from "@/services/vote.service";
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import {useRouter} from "vue-router";
import {WebAppController} from "@/utils/telegram/web.app.util";
import VoteFinishModal from "@/views/vote/VoteFinishModal.vue";

const router = useRouter();

const votes = ref([]);
const activeVote = ref(1);
const activePrizeModal = ref(false);

const answerIds = ref([]);

let filterAnswers = ref([]);

const lastQuestion = computed(() => {
  return votes.value.length === activeVote.value;
});

const checkValid = computed(() => {
  const isRequired = votes.value[activeVote.value - 1]?.is_required;
  if (isRequired) {
    const currentItem = answerIds.value[activeVote.value - 1]?.values;
    if (typeof currentItem === "number" || typeof currentItem === "string") {
      return currentItem;
    } else {
      return currentItem && currentItem.length;
    }
  } else {
    return true;
  }
});

const fetchVotes = async () => {
  try {
    const {data} = await voteApi.fetchVotes();
    votes.value = data["questions"];

    data["questions"].forEach(({id}, index) => {
      answerIds.value[index] = {
        id,
        values: [],
      };
    });
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message);
  }
};

const backQuestion = () => {
  if (activeVote.value > 1) {
    activeVote.value--;
  }
};
const nextQuestion = () => {
  if (!lastQuestion.value) {
    activeVote.value++;
  }
};

function finishVote() {
  answerIds.value.forEach((item) => {
    if (typeof item === "number" || typeof item === "string") {
      filterAnswers.value.push(item.values);
    } else {
      filterAnswers.value = filterAnswers.value.concat(item.values);
    }
  });

  try {
    const body = {
      answer_ids: filterAnswers.value,
    };
    const data = voteApi.sendAnswers(body);
    console.log(data, 'data');
    toast.success('success', {
      position: "bottom-center",
      hideProgressBar: true,
      closeButton: false,
    });
    activePrizeModal.value = true;
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message);
  }
}

function closePrizeModal() {
  router.push({name: "home"});
  activePrizeModal.value = false;
}

onMounted(async () => {
  await fetchVotes();
});

WebAppController.ready();
</script>

<template>
  <div class="layout-container">
    <div v-if="votes && votes.length" class="vote-class">
      <vote-progress :total-length="votes.length" :active-index="activeVote"/>

      <vote-answers
          :vote="votes[activeVote - 1]"
          :active-index="activeVote"
          v-model="answerIds[activeVote - 1].values"
      />

      <div class="vote-buttons">
        <button
            :disabled="activeVote <= 1"
            @click="backQuestion"
            class="vote-btn vote-back"
        >
          <img src="@/assets/icons/arrow-left.svg" alt=""/>
          <p>Назад</p>
        </button>
        <button
            v-if="!lastQuestion"
            :disabled="!checkValid"
            @click="nextQuestion"
            class="vote-btn vote-next"
        >
          <p>Дальше</p>
          <img src="@/assets/icons/arrow-right.svg" alt=""/>
        </button>
        <button v-else @click="finishVote" class="vote-btn vote-finish">
          <p>Завершить</p>
        </button>
      </div>
    </div>


    <vote-finish-modal :active="activePrizeModal" @close-modal="closePrizeModal"/>
  </div>
</template>

<style lang="scss" scoped>
.vote-class {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: #333;
}

.vote-buttons {
  display: flex;
  column-gap: 1rem;
  margin-top: 0.5rem;

  .vote-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;
    width: 100%;
    padding: 12px;
    border-radius: 8px;

    p {
      @extend .font-16;
      line-height: 20px;
      color: #ffffff;
    }
  }

  .vote-back {
    background: #f5f5f5;

    p {
      @include text-gradient(
              linear-gradient(145.27deg, #313331 -5.05%, #181716 105.01%)
      );
    }
  }

  .vote-next {
    background: linear-gradient(180deg, #00bbf9 0%, #00a3ff 100%);

    &:disabled {
      opacity: 0.65;
    }
  }

  .vote-finish {
    background: linear-gradient(142.74deg, #00ff85 -18.06%, #00b05c 110.27%);
  }
}
</style>
