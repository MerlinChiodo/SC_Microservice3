<template>
  <div v-if="documents[0]">
    <ul>
      <li v-for="document in documents" v-bind:key="document.id_dokument">
        <img src="../assets/pdficon.svg" style="max-width: 20px" /><a
          :href="this.apiUrl + 'documents?id=' + document.id_dokument"
          target="_blank"
          >{{ document.path_fileserver }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DocumentList",
  async beforeMount() {
    if (!this.applicationDocuments) {
      this.documents = await this.getUserDocuments();
      console.log("showing user's documents", this.documents);
    } else {
      this.documents = this.applicationDocuments;
      console.log("showing application documents", this.documents);
    }
  },
  inject: ["apiUrl"],
  props: [
    "internalId",
    "smartCityId",
    "employeeMode",
    "applicationDocuments",
    "docListKey",
  ],
  data() {
    return {
      documents: [],
    };
  },
  methods: {
    async getUserDocuments() {
      const response = await fetch(
        this.apiUrl + "documents/allById?id=" + this.internalId
      );
      const data = await response.json();
      return data;
    },
    async getDocument(documentId) {
      const response = await fetch(this.apiUrl + "documents?id=" + documentId);
      const data = await response.json();
      const documentPath = this.apiUrl + data;
      console.log(documentPath);
      return documentPath;
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
</style>
