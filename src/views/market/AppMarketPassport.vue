<script setup>
import {ref} from "vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";

const form = ref({
  pinfl: null,
  passportImage: null,
})

let imageId = ref(false)

function triggerFile(file) {
  form.value.passportImage = file.files[0]
}

function toggleImageId() {
  imageId.value = !imageId.value
}


</script>

<template>
  <div class="market-passport">
    <div class="layout-container">
      <div class="market-passport__block">
        <BaseInput
            v-model="form.pinfl"
            name="pinfl"
            label="Ваш ПИНФЛ"
        />

        <div class="file-upload" v-if="!form.passportImage">
          <input
              :value="form.passportImage"
              @input="triggerFile($event.target)"
              type="file"
              accept="image/*"
              class="file-upload__input"
          >

          <div class="file-upload__not-uploaded">
            <img src="@/assets/images/document-upload.svg" alt="">
            <p>Загрузить фото паспорта</p>
          </div>
        </div>

        <div v-else class="file-upload__uploaded">
          <div class="file-upload__uploaded-preview">
            <img src="@/assets/images/document-text.svg" alt="">
          </div>
          <div class="file-upload__uploaded-details">
            <div class="flex flex-column justify-between">
              <p>passport.pdf</p>
              <span>100 kb</span>
            </div>
            <button>
              <img src="@/assets/images/close-circle.svg" alt="">
            </button>
          </div>
        </div>

        <button
            v-if="!imageId"
            class="market-passport__btn"
            :class="imageId ? 'disabled' : ''"
            :disabled="imageId"
            @click="toggleImageId"
        >
          <img src="@/assets/images/attach-icon.svg" alt="">
          <span>Загрузить фото паспорта</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.market-passport {
  &__block {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__btn {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    background: var(--accent-yellow);
    display: flex;
    align-items: center;
    justify-content: center;

    &.disabled {
      background-color: var(--accent-gray);
    }

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin-right: 10px;
    }

    & span {
      @extend .text-16-500;
      color: var(--text-main)
    }
  }
}

.file-upload {
  position: relative;
  width: 100%;
  height: 128px;
  border: 1px dashed var(--text-secondary);
  border-radius: 8px;

  &__not-uploaded {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    & img {
      margin-bottom: 1rem;
    }

    & p {
      @extend .text-16-500;
      color: var(--text-secondary);
    }
  }

  &__uploaded {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    z-index: 100;

    &-preview {
      width: 44px;
      height: 44px;
      min-width: 44px;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-gray);
      border-radius: 72px;

      & img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }

    &-details {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & p {
        @extend .text-16-500;
        color: var(--text-main);
        margin-bottom: 4px;
      }

      & span {
        @extend .text-14-400;
        color: var(--text-secondary);
      }
    }

    &-btn {
      position: absolute;
      width: 36px;
      height: 36px;
      padding: 6px;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    //visibility: hidden;
    opacity: 0;
    background: transparent;
    z-index: 1000;
  }
}
</style>
