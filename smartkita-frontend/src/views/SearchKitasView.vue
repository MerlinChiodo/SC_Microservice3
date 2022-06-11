<template>
  <div class="searchkitascontainer">
    <!--  json dump for debugging  -->
    <!--    <p v-for="application in this.applicationsList" :key="application.id">
      {{ application }}
    </p>-->

    <DataTable
      :value="kitasList"
      showGridlines
      stripedRows
      :paginator="true"
      :rows="12"
    >
      <Column field="name" header="Name"></Column>
      <Column field="traeger" header="Träger"></Column>
      <Column field="traeger_kategorie" header="Trägertyp"></Column>
      <Column field="strasse" header="Straße"></Column>
      <Column field="hausnr" header="Hausnr."></Column>
      <Column field="plz" header="PLZ"></Column>
      <Column field="email" header="E-Mail"></Column>
      <Column field="url_website" header="Website"></Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.getKitasList();
    console.log(this.kitasList);
  },
  name: "SearchKitasView",
  inject: ["apiUrl"],
  data() {
    return {
      kitasList: null,
    };
  },
  methods: {
    async getKitasList() {
      const response = await fetch(
        this.apiUrl + "kitas/all"
      );
      const data = await response.json();
      this.kitasList = data;
    },
  },
};
</script>

<style scoped>
.searchkitascontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
