<template>
  <div class="documentviewcontainer">
    <div class="surface-card p-4 shadow-2 border-round-md">
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-8">
          <div
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <DocumentUploadForm></DocumentUploadForm>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Meine Dokumente</h4>
            <DocumentList
              :internalId="this.user.internalId"
              :smartCityId="this.user.smartCityId"
              :employeeMode="false"
            ></DocumentList>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
.documentviewcontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
