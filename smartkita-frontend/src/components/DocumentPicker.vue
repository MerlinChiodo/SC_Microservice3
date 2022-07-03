<template>
  <div v-if="documents[0]">
    <ul>
      <li v-for="document in documents" v-bind:key="document.id_dokument">
        <span>
          <Button
            class="p-button-raised p-button-rounded"
            style="width: 8px; height: 8px; margin-right: 4px"
            icon="pi pi-minus"
            v-if="this.selectedDocuments.includes(document.id_dokument)"
            @click="this.unselect(document.id_dokument)"
          ></Button>
          <Button
            v-else
            class="p-button-rounded p-button-outlined"
            style="
              max-height: 8px;
              max-width: 8px;
              margin-right: 4px;
              background-color: white !important;
              color: var(--buttonDarkerColor);
            "
            icon="pi pi-plus"
            @click="this.select(document.id_dokument)"
          >
          </Button>
          <img src="../assets/pdficon.svg" style="max-width: 20px" /><a
            :href="this.apiUrl + 'documents?id=' + document.id_dokument"
            target="_blank"
            >{{ document.path_fileserver }}</a
          >
        </span>
      </li>
      <!--      <a :href="this.apiUrl + 'documents?id=' + this.documents[0].id_dokument"
        >TEST PDF</a
      >-->
    </ul>
  </div>
  <div v-else>
    Noch keine Dokumente vorhanden.
    <span @click="this.$router.push('/documents')">Hier geht's zum Upload</span>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  name: "DocumentPicker",
  async beforeMount() {
    this.documents = await this.getUserDocuments();
  },
  inject: ["apiUrl"],
  props: [],
  data() {
    return {
      user: useUserStore(),
      documents: [],
      selectedDocuments: [],
    };
  },
  computed: {
    isSelected(docId) {
      return this.selectedDocuments.includes(docId);
    },
  },
  methods: {
    async getUserDocuments() {
      const response = await fetch(
        this.apiUrl + "documents/allById?id=" + this.user.internalId
      );
      const data = await response.json();
      return data;
    },
    select(docId) {
      this.selectedDocuments.push(docId);
    },
    unselect(docId) {
      this.selectedDocuments.splice(this.selectedDocuments.indexOf(docId), 1);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  text-align: start;
  margin-bottom: 5px;
}
a:link,
a:visited {
  text-decoration: none;
  color: #2c3e50;
}

a:hover,
a:active {
  text-decoration: none;
  color: var(--buttonDarkerColor);
}
.p-button {
  background-color: var(--buttonColor);
}
.p-button:hover {
  background-color: var(--buttonHoverColor) !important;
}

.p-button:active,
.p-button:focus {
  background-color: var(--buttonDarkerColor) !important;
}
</style>
