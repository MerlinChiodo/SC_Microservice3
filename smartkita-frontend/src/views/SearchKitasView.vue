<template>
  <div class="searchkitascontainer">
    <DataTable
      :value="kitasList"
      showGridlines
      stripedRows
      :paginator="true"
      :rows="12"
      v-model:filters="filters"
      :globalFilterFields="['name', 'traeger', 'traeger_kategorie', 'plz']"
    >
      <template #header>
        <div class="flex justify-content-center align-items-center">
          <h2 class="m-0">Einrichtungen</h2>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Stichwortsuche"
            />
          </span>
        </div>
      </template>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="traeger" header="Träger" :sortable="true"></Column>
      <Column
        field="traeger_kategorie"
        header="Trägertyp"
        :sortable="true"
      ></Column>
      <Column field="plz" header="PLZ" :sortable="true"></Column>
      <Column field="email" header="E-Mail"></Column>
      <Column field="url_website" header="Website"></Column>
      <Column
        headerStyle="width: 9rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body>
          <Button type="button" icon="pi pi-bookmark"></Button>
          <Button
            type="button"
            icon="pi pi-angle-right"
            style="margin-left: 0.5rem"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import {FilterMatchMode} from 'primevue/api';
export default {
  beforeMount() {
    this.getKitasList();
    console.log(this.kitasList);
  },
  name: "SearchKitasView",
  inject: ["apiUrl"],
  props: [],
  data() {
    return {
      kitasList: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  methods: {
    async getKitasList() {
      const response = await fetch(this.apiUrl + "kitas/all");
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

.p-input-icon-left > .p-inputtext:enabled:focus {
  border-color: var(--buttonColor);
  box-shadow: inset 0 0 0 1px var(--buttonColor), inset 0 0 0 1px var(--buttonColor), inset 0 0 0 1px var(--buttonColor), inset 0 0 0 1px var(--buttonColor);
}
</style>
