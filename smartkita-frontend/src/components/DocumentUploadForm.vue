<template>
  <h4>Dokumente anfügen</h4>
  <FileUpload
    name="documents[]"
    :url="this.uploadUrl"
    :multiple="true"
    accept=".pdf"
  ></FileUpload>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  name: "DocumentUploadForm",
  inject: ["apiUrl"],
  data() {
    return {
      uploadUrl: this.apiUrl + "documents",
      user: useUserStore(),
    };
  },
};
</script>

<style scoped></style>
