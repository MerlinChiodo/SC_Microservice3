<template>
  <h1>Verträge</h1>
  <!--  <p>{{ this.contractsList }}</p>-->
  <div class="contractscontainer" v-if="contractsList">
    <DataTable
      v-if="this.contractsList"
      :value="contractsList"
      showGridlines
      stripedRows
      :paginator="true"
      :rows="12"
      sortField="id_vertrag"
      sortOrder="-1"
    >
      <Column field="id_vertrag" header="ID Vertrag" :sortable="true"></Column>
      <Column
        field="einrichtung.name"
        header="Einrichtung"
        :sortable="true"
      ></Column>
      <Column field="id_ezb" header="ID EZB" :sortable="true"></Column>
      <Column field="id_kind" header="ID Kind" :sortable="true"></Column>
      <Column
        field="betreuungsstunden"
        header="Betreuungsstunden"
        :sortable="true"
      ></Column>
      <Column field="bemerkung" header="Bemerkung"></Column>
      <Column field="beginn" header="Beginn" :sortable="true"></Column>
      <Column field="ende" header="Ende" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: "ContractsView",
  beforeMount() {
    this.getContractsList();
  },
  data() {
    return {
      contractsList: null,
    };
  },
  inject: ["apiUrl"],
  methods: {
    async getContractsList() {
      const response = await fetch(this.apiUrl + "contracts/all");
      const data = await response.json();
      this.contractsList = data;
    },
  },
};
</script>

<style scoped>
.contractscontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
