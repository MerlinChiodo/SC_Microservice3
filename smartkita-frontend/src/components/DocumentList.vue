<template>
  DocuementList
  <Button @click="test"></Button>
  <a :href="this.apiUrl + 'documents?id=' + this.documents[0].id_dokument"
    >TEST PDF</a
  >
</template>

<script>
export default {
  name: "DocumentList",
  async beforeMount() {
    this.documents = await this.getUserDocuments();
    console.log(this.documents);
  },
  inject: ["apiUrl"],
  props: ["internalId", "smartCityId", "employeeMode"],
  data() {
    return {
      documents: [],
    };
  },
  methods: {
    async test() {
      const test = await this.getDocument(this.documents[0].id_dokument);
      console.log(test);
      return test;
    },
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

<style scoped></style>
