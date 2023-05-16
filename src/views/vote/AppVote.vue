<script setup>
import VoteProgress from "@/views/vote/VoteProgress.vue";
import VoteAnswers from "@/views/vote/VoteAnswers.vue";
import { computed, onMounted, ref } from "vue";
import { voteApi } from "@/services/vote.service";
import { useRouter } from "vue-router";
import { WebAppController } from "@/utils/telegram/web.app.util";
import VoteFinishModal from "@/views/vote/VoteFinishModal.vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import { setSessionStorageVariable } from "@/utils/localstorage.util";

const router = useRouter();
const { t } = useI18n();
const toast = useToast();

const votes = ref([]);
const activeVote = ref(1);
const activePrizeModal = ref(false);

const answerIds = ref([]);

let filterAnswers = ref([]);
const awardCoin = ref(null);

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
    const { data } = await voteApi.fetchVotes();
    votes.value = data["questions"];

    data["questions"].forEach(({ id }, index) => {
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

async function finishVote() {
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
    const { data } = await voteApi.sendAnswers(body);
    toast.success(`${t("vote_page.price", { price: awardCoin.value })}`, {
      position: "bottom-center",
      hideProgressBar: true,
      closeButton: false,
    });
    awardCoin.value = data.data["award_coin"];
    activePrizeModal.value = true;
    setSessionStorageVariable("vote_approved", true);
  } catch (e) {
    toast.error(e.response?.data?.message ?? e.message);
  }
}

function closePrizeModal() {
  router.push({ name: "home" });
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
      <vote-progress :total-length="votes.length" :active-index="activeVote" />

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
          <ArrowLeftIcon size="20" fill="var(--text-main)" />
          <p>{{ t("vote.back") }}</p>
        </button>
        <button
          v-if="!lastQuestion"
          :disabled="!checkValid"
          @click="nextQuestion"
          class="vote-btn vote-next"
        >
          <p>{{ t("vote.next") }}</p>
          <ArrowRightIcon size="20" fill="var(--gf-text-white-2x)" />
        </button>
        <button v-else @click="finishVote" class="vote-btn vote-finish">
          <p>{{ t("vote.complete") }}</p>
        </button>
      </div>
    </div>

    <vote-finish-modal
      v-if="activePrizeModal"
      :active="activePrizeModal"
      :awardCoin="awardCoin"
      @close-modal="closePrizeModal"
    />
  </div>
</template>

<style lang="scss" scoped>
.vote-class {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: var(--text-main);
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
      color: var(--gf-text-white-2x);
    }
  }

  .vote-back {
    background: var(--accent-gray);

    p {
      @extend .text-16-500;
      color: var(--text-main);
    }
  }

  .vote-next {
    background: var(--gf-blue-gradient-01);

    &:disabled {
      opacity: 0.65;
    }
  }

  .vote-finish {
    background: linear-gradient(142.74deg, #00ff85 -18.06%, #00b05c 110.27%);
  }
}
</style>
