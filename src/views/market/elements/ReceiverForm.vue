<script setup>
import * as yup from "yup";
import { reactive, ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { isArray } from "@/utils/inspect.util";
import { uploadApi } from "@/services/upload.service";

import AttachIcon from "@/components/icons/AttachIcon.vue";
import BotCloseIcon from "@/components/icons/BotCloseIcon.vue";
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import DocumentUploadIcon from "@/components/icons/DocumentUploadIcon.vue";
import DocumentTextIcon from "@/components/icons/document/DocumentTextIcon.vue";
import AppCircleProgress from "@/components/elements/progress/AppCircleProgress.vue";

const uploadInput = ref(null);
const toast = useToast();
const upload = reactive({
  percentCompleted: 65,
  file: null,
  progressEvent: {
    loaded: 0,
    total: 0,
    progress: 1,
    bytes: 0,
    event: {
      isTrusted: true,
    },
    upload: true,
  },
  show: false,
  load: false,
  result: {
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

const { validate, values } = useForm();

const { value: firstName, errorMessage: firstNameEMessage } = useField(
  "clientFirstName",
  yup.string().required().label("Имя получателя")
);

const { value: lastName, errorMessage: lastNameEMessage } = useField(
  "clientLastName",
  yup.string().required().label("Фамилия получателя")
);

const { value: pinfl, errorMessage: pinflEMessage } = useField(
  "clientPinfl",
  yup.string().length(14).required().label("Введите ПИНФЛ получателя")
);

const {
  value: passportFile,
  errorMessage: identifyErrorMessage,
  setValue: setPassportFile,
  errors,
} = useField("passportFile", yup.object().required().label("Passport file"));

function onPickFile() {
  uploadInput.value.click();
}
async function uploadIdentificationFile(e) {
  try {
    startUploadEvent();

    const files = e.target.files;

    setPassportFile({
      name: files[0].name,
      size: files[0].size,
    });

    let config = {
      onUploadProgress: function (progressEvent) {
        upload.percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        upload.progressEvent.loaded = progressEvent.loaded;
        upload.progressEvent.total = progressEvent.total;
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
      upload.load = true;
      upload.result = response.data.result;
    }
  } catch (e) {
    upload.load = false;
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

    finishUploadEvent();
  } finally {
    e.target.value = "";
  }
}

function startUploadEvent() {
  upload.show = true;
}

function finishUploadEvent() {
  upload.show = false;
}

function byteToMegabyte(b) {
  const m = b / Math.pow(10, 6);
  return m.toFixed(2);
}

function removeUploadFile() {
  finishUploadEvent();
  upload.load = false;
  setPassportFile(null);
}

defineExpose({
  values,
  errors,
  validate,
  passport: upload.result.id,
});
</script>

<template>
  <div class="ol-receiver-form">
    <div>данные получателя</div>

    <div>
      <base-input v-model="firstName" label="Имя получателя" />
      <span v-if="firstNameEMessage" class="error-message d-block mt-0-5">
        {{ firstNameEMessage }}
      </span>
    </div>
    <div>
      <base-input v-model="lastName" label="Фамилия получателя" />
      <span v-if="lastNameEMessage" class="error-message d-block mt-0-5">
        {{ lastNameEMessage }}
      </span>
    </div>
    <div>
      <base-input
        type="number"
        v-model="pinfl"
        label="Введите ПИНФЛ получателя"
      />
      <span v-if="pinflEMessage" class="error-message d-block mt-0-5">
        {{ pinflEMessage }}
      </span>
    </div>

    <div class="flex justify-between align-center mt-1-5" v-if="upload.show">
      <div class="flex align-center column-gap-1">
        <app-circle-progress
          :size="48"
          :border-bg-width="3"
          :border-width="upload.load ? 0 : 3"
          :percent="upload.percentCompleted"
          :viewport="true"
          :is-shadow="false"
          :is-bg-shadow="false"
          empty-color="#F5F5F5"
          background="#F5F5F5"
        >
          <div v-if="upload.load">
            <span>
              <document-text-icon />
            </span>
          </div>
          <div v-else>
            <bot-close-icon />
          </div>
        </app-circle-progress>
        <span class="flex flex-column row-gap-0-5">
          <span class="ol-file-name">{{ passportFile.name }}</span>
          <span class="ol-file-size">
            <span v-if="!upload.load">
              <span>
                {{ byteToMegabyte(upload.progressEvent.loaded) }}
              </span>
              <span>/</span>
            </span>
            <span>{{ byteToMegabyte(upload.progressEvent.total) }}</span>
            <span class="ml-0-5">MB</span>
          </span>
        </span>
      </div>
      <div
        @click="removeUploadFile"
        class="ol-cancel-upload-file flex align-center justify-center"
      >
        <bot-close-icon :size="18" fill="#ffffff" />
      </div>
    </div>

    <div v-else class="ol-upload-container mt-1-5">
      <div
        class="ol-upload-content flex flex-column justify-center align-center row-gap-1"
      >
        <input
          ref="uploadInput"
          @input="uploadIdentificationFile"
          type="file"
          accept="image/*"
          class="ol-upload-input"
        />
        <document-upload-icon />
        <p>Загрузить фото паспорта</p>
      </div>

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

      <span v-if="identifyErrorMessage" class="error-message d-block mt-0-5">
        {{ identifyErrorMessage }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ol-receiver-form {
  margin: 1rem;
  color: var(--gf-text-33);
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

.ol-file-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}

.ol-file-size {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a3abb8;
}

.ol-cancel-upload-file {
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 50%;
  background: #a3abb8;
}
</style>
