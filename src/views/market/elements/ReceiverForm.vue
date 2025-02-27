<script setup>
import * as yup from "yup";
import { computed, reactive, ref } from "vue";
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
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { toastErrorMessage } from "@/utils/error.util";
import { coinApi } from "@/services/coin.service";
import { loadingComposable } from "@/composables/loading.composable";

const uploadInput = ref(null);
const toast = useToast();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const upload = reactive({
  percentCompleted: 0,
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

const { startLoading, finishLoading } = loadingComposable();

const { validate, values, setValues } = useForm();

const isUpdatingClient = computed(
  () => route.name === "checkout-client-update"
);

const { value: firstName, errorMessage: firstNameEMessage } = useField(
  "clientFirstName",
  yup
    .string()
    .required(t("yup.required", { _field_: t("market_page.receiver_name") }))
    .label("Имя получателя")
);

const { value: lastName, errorMessage: lastNameEMessage } = useField(
  "clientLastName",
  yup
    .string()
    .required(t("yup.required", { _field_: t("market_page.receiver_surname") }))
    .label("Фамилия получателя")
);

const { value: pinfl, errorMessage: pinflEMessage } = useField(
  "clientPinfl",
  yup
    .string()
    .max(
      14,
      t("yup.max_value", { _field_: t("market_page.receiver_pinfl"), max: 14 })
    )
    .min(
      14,
      t("yup.min_value", { _field_: t("market_page.receiver_pinfl"), min: 14 })
    )
    .required(
      t("yup.required", {
        _field_: t("market_page.receiver_pinfl"),
        min: "14",
      })
    )
    .label("Введите ПИНФЛ получателя")
);

const {
  value: passportFile,
  errorMessage: identifyErrorMessage,
  setValue: setPassportFile,
  errors,
} = useField(
  "passportFile",
  yup
    .object()
    .required(
      t("yup.required", { _field_: t("market_page.passport_image_yup") })
    )
    .label("Passport file")
);

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

async function deleteClient() {
  const id = route.params.id;
  try {
    startLoading();
    await coinApi.clientRemove({
      id: id,
    });
    await router.push({
      name: "market-checkout",
    });
  } catch (e) {
    toastErrorMessage(e);
  } finally {
    finishLoading();
  }
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

function fillOut({ firstName, lastName, pinfl, passportFile }) {
  setValues({
    clientPinfl: pinfl,
    clientLastName: lastName,
    clientFirstName: firstName,
    passportFile: passportFile,
  });

  upload.show = true;
  upload.load = true;
  upload.percentCompleted = 100;
  upload.progressEvent.upload = passportFile.size;
  upload.progressEvent.total = passportFile.size;
}

defineExpose({
  values,
  errors,
  validate,
  passport: upload.result.id,
  fillOut,
});
</script>

<template>
  <div class="ol-receiver-form">
    <div class="receiver_details">
      {{ t("market_page.receiver_details_title") }}
    </div>

    <div>
      <base-input v-model="firstName" :label="t('market_page.receiver_name')" />
      <span v-if="firstNameEMessage" class="error-message d-block mt-0-5">
        {{ firstNameEMessage }}
      </span>
    </div>
    <div>
      <base-input
        v-model="lastName"
        :label="t('market_page.receiver_surname')"
      />
      <span v-if="lastNameEMessage" class="error-message d-block mt-0-5">
        {{ lastNameEMessage }}
      </span>
    </div>
    <div>
      <base-input
        type="number"
        v-model="pinfl"
        :label="t('market_page.receiver_pinfl')"
      />
      <span v-if="pinflEMessage" class="error-message d-block mt-0-5">
        {{ pinflEMessage }}
      </span>
    </div>

    <label class="passport-label">
      {{ t("market_page.passport_image_yup") }}
    </label>
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

    <div v-else class="ol-upload-container mt-0-5">
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
        <p>{{ t("market_page.form.upload_passport") }}</p>
      </div>

      <div
        ref="uploadIdentificationButton"
        class="ol-upload-button mt-1 flex align-center justify-center"
        @click="onPickFile"
      >
        <span class="mr-0-5">
          <attach-icon fill="var(--gf-text-33)" />
        </span>
        <span>{{ t("market_page.form.upload_passport") }}</span>
      </div>

      <span v-if="identifyErrorMessage" class="error-message d-block mt-0-5">
        {{ identifyErrorMessage }}
      </span>
    </div>

    <button v-if="isUpdatingClient" @click="deleteClient" class="delete-btn">
      {{ $t("market_page.delete_client") }}
    </button>
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
    background-color: var(--accent-gray);
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

.receiver_details {
  @extend .text-15-600;
  color: var(--gf-text-33);
  text-transform: uppercase;
}

.passport-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-top: 1rem;
  display: block;
}

.delete-btn {
  @extend .text-15-600;
  color: var(--gf-text-white-2x);
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eb5757;
  border-radius: 8px;
  border: none;
  margin-top: 3rem;
}
</style>
