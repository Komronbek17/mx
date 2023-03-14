<script setup>
import ModalDialog from "@/components/ui/ModalDialog/ModalDialog.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter()

const startVoteModal = ref(false)

function closeVoteModal(){
  startVoteModal.value = false
}

function redirectVotePage() {
  router.push({name: 'votes'})
}

// onMounted(async () => {
// })


</script>

<template>
  <div>
    <modal-dialog :model-value="startVoteModal" @close-modal="closeVoteModal">
      <template #header>
        <div class="modal-header">
          <img src="@/assets/icons/money.svg" alt=""/>
        </div>
      </template>
      <template #content>
        <div class="modal-content">
          <h3 class="modal-content__title">
            Хотите получить больше монет?
            <!--            {{ t("market_page.activated") }}!-->
          </h3>
          <p class="modal-content__subtitle">
            Пройдите наш небольшой опросник
            и получите монеты!
            <!--            {{-->
            <!--              t("connect_premium_service_message", {-->
            <!--                level: 1,-->
            <!--              })-->
            <!--            }}!-->
          </p>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer">
          <div @click="redirectVotePage" class="modal-footer__button btn-info">
            Пройти опросник
<!--            {{ $t("ok") }}-->
          </div>
        </div>
      </template>
    </modal-dialog>

  </div>
</template>
