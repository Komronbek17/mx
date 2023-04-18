<script setup>
import * as yup from "yup";
import { reactive, ref } from "vue";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { isArray } from "@/utils/inspect.util";
import { uploadApi } from "@/services/upload.service";
import { loadingComposable } from "@/composables/loading.composable";

import AttachIcon from "@/components/icons/AttachIcon.vue";
import BotCloseIcon from "@/components/icons/BotCloseIcon.vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import DocumentUploadIcon from "@/components/icons/DocumentUploadIcon.vue";
import DocumentTextIcon from "@/components/icons/document/DocumentTextIcon.vue";
import AppCircleProgress from "@/components/elements/progress/AppCircleProgress.vue";

const uploadInput = ref(null);
const toast = useToast();
const uploadFile = reactive({
  percentCompleted: 65,
  show: true,
  load: false,
  details: {
    id: 345,
    uuid: "e09696d2-ff61-4e77-bea2-4fef552dffb4",
    type: "passports",
    path: "https://fitgroup-prod.s3.eu-west-3.amazonaws.com/uploads/passports/DfxYVoMuejTGTrTZcFRoyMJvT85ibWav3BUGB2jb.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAX2ZEDBOLN6AVO4YP%2F20230418%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230418T152031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=0e3fe203692f694977e16b1e8cc3b511c915b16095c4919d5e45bbf0119e108c",
    name: "Screenshot 2023-04-10 at 23.53.54.png",
    size: 176747,
    extension: "png",
    user: {
      id: 26,
      name: null,
      phone: "998997008020",
      avatar: {
        id: 81,
        uuid: "8b809bf8-5151-41f2-9959-f0be1dcb7887",
        path: "https://fitgroup-prod.s3.eu-west-3.amazonaws.com/uploads/avatars/XQxcS8cONdxCTHqAfTzXstPHQQ6BNPjUCANxrTDM.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAX2ZEDBOLN6AVO4YP%2F20230418%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230418T152031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=0eaf18c70d84d32f741a79fbdc3fed319292b822dab971d3d685cd33d21c8c53",
        name: "07.png",
        size: "59975",
        extension: "png",
        lang: "any",
        position: 1,
      },
    },
    merchant: {
      id: 2,
      name: "Oltin-baliq",
    },
    relation_id: null,
    relation_type: null,
    lang: "any",
    position: 1,
    created_at: "2023-04-18 15:20:31",
    updated_at: "2023-04-18 15:20:31",
  },
});

const {
  loading: fileLoading,
  startLoading: startFileLoading,
  finishLoading: finishFileLoading,
} = loadingComposable();

const { value: fullName, errorMessage: fullNameEMessage } = useField(
  "clientFullName",
  yup.string().required().label("Получатель")
);

const { value: pinfl, errorMessage: pinflEMessage } = useField(
  "clientPinfl",
  yup.string().required().label("Введите ПИНФЛ получателя")
);

const { value: clientIdentification, errorMessage: IdentifyErrorMessage } =
  useField(
    "clientIdentification",
    yup.object().required().label("Identification file")
  );

function onPickFile() {
  uploadInput.value.click();
}
async function uploadIdentificationFile(e) {
  try {
    startFileLoading();
    const files = e.target.files;

    let config = {
      onUploadProgress: function (progressEvent) {
        uploadFile.percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      },
    };

    const body = new FormData();
    body.append("merchant_id", `2`);
    body.append("file", files[0]);

    const response = await uploadApi.uploadPassport({
      body,
      config,
    });

    if (response) {
      uploadFile.load = true;
    }
  } catch (e) {
    uploadFile.load = false;
    if (e?.response?.data?.message) {
      const { message } = e.response.data;
      if (isArray(message) && message.length) {
        toast.error(message[0]);
      } else {
        toast.error(message);
      }
    } else {
      toast.error(e.message);
    }
  } finally {
    e.target.value = "";
    finishFileLoading();
  }
}
</script>

<template>
  <div class="ol-receiver-form">
    <div>данные получателя</div>

    <div>
      <base-input v-model="fullName" label="Получатель" />
      <span v-if="fullNameEMessage" class="error-message d-block mt-0-5">
        {{ fullNameEMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="pinfl" label="Введите ПИНФЛ получателя" />
      <span v-if="pinflEMessage" class="error-message d-block mt-0-5">
        {{ pinflEMessage }}
      </span>
    </div>

    <div v-if="uploadFile.show || fileLoading">
      <app-circle-progress
        :size="48"
        :border-bg-width="3"
        :border-width="4"
        :percent="uploadFile.percentCompleted"
        :viewport="true"
        :is-shadow="false"
        :is-bg-shadow="false"
        empty-color="#F5F5F5"
        background="#F5F5F5"
      >
        <div v-if="uploadFile.load">
          <span>
            <document-text-icon />
          </span>
        </div>
        <div v-else>
          <bot-close-icon />
        </div>
      </app-circle-progress>
    </div>

    <div v-else class="ol-upload-container mt-1-5">
      <div
        class="ol-upload-content flex flex-column justify-center align-center row-gap-1"
      >
        <input
          ref="uploadInput"
          :value="clientIdentification"
          @input="uploadIdentificationFile"
          type="file"
          accept="image/*"
          class="ol-upload-input"
        />
        <document-upload-icon />
        <p>Загрузить фото паспорта</p>
      </div>
      <span v-if="IdentifyErrorMessage" class="error-message d-block mt-0-5">
        {{ IdentifyErrorMessage }}
      </span>
      <div
        ref="uploadIdentificationButton"
        class="ol-upload-button mt-1 flex align-center justify-center"
        @click="onPickFile"
      >
        <span class="mr-0-5">
          <attach-icon />
        </span>
        <span>Загрузить фото паспорта</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-receiver-form {
  margin: 1rem;
}

.error-message {
  color: #eb5757;
}

.ol-upload-container {
  .ol-upload-content {
    height: 156px;
    cursor: pointer;
    border-radius: 0.5rem;
    color: var(--gf-text-secondary-gray);
    border: 2px dashed #a3abb8;
    position: relative;

    .ol-upload-input {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: red;
      opacity: 0;
    }

    p {
      color: var(--gf-text-secondary-gray);
    }
  }

  .ol-upload-button {
    width: 100%;
    cursor: pointer;
    padding: 0.75rem 0;
    border-radius: 0.5rem;
    color: var(--gf-text-33);
    background-color: var(--gf-p-main-gray);
  }
}
</style>
