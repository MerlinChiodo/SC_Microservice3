<template>
  <div class="applicationscontainer">
    <!--  json dump for debugging  -->
    <!--    <p v-for="application in this.applicationsList" :key="application.id">
      {{ application }}
    </p>-->

    <DataTable
      :value="applicationsList"
      showGridlines
      stripedRows
      :paginator="true"
      :rows="12"
    >
      <Column field="id_antrag" header="ID Antrag"></Column>
      <Column field="id_kind" header="ID Kind"></Column>
      <Column field="id_ezb" header="ID Erziehungsberechtige*r"></Column>
      <Column field="betreuungsstunden" header="Betreuungsstunden"></Column>
      <Column field="bemerkung" header="Bemerkung"></Column>
      <Column field="datum" header="Gestellt am"></Column>
      <Column field="prioritaet" header="Priorität"></Column>
      <Column field="status" header="Status"></Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.getApplicationsList();
    console.log(this.applicationsList);
  },
  name: "ApplicationsView",
  data() {
    return {
      applicationsList: null,
    };
  },
  computed: {
    /* might delete later */
    applicationsListFormatted() {
      return JSON.stringify(this.applicationsList, null, 2);
    },
  },
  methods: {
    async getApplicationsList() {
      /* Hardcoding for now, will use pinia later */
      /*"http://vps2290194.fastwebserver.de:9730/api/applications/all"*/
      /*"http://localhost:3001/api/applications/all*/
      const response = await fetch(
        "http://localhost:3001/api/applications/all"
      );
      const data = await response.json();
      this.applicationsList = data;
    },
  },
};
</script>

<style scoped>
.applicationscontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
