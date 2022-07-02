<template>
  <DocumentUploadForm></DocumentUploadForm>
  <h4>Meine Dokumente</h4>
  <DocumentList
    :internalId="this.user.internalId"
    :smartCityId="this.user.smartCityId"
    :employeeMode="false"
  ></DocumentList>
</template>

<script>
import DocumentUploadForm from "../components/DocumentUploadForm.vue";
import DocumentList from "../components/DocumentList.vue";

import { useUserStore } from "../stores/user";
export default {
  name: "DocumentsView",
  inject: ["apiUrl"],
  data() {
    return {
      user: useUserStore(),
    };
  },
  components: { DocumentUploadForm, DocumentList },
};
</script>

<style scoped></style>
