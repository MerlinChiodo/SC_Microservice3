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
      contextMenu
      v-model:contextMenuSelection="selectedApplication"
      @rowContextmenu="onRowContextMenu"
    >
      <Column field="id_antrag" header="ID Antrag"></Column>
      <Column field="id_kind" header="ID Kind"></Column>
      <Column field="id_ezb" header="ID Erziehungsberechtige*r"></Column>
      <Column field="betreuungsstunden" header="Betreuungsstunden"></Column>
      <Column field="bemerkung" header="Bemerkung"></Column>
      <Column field="datum" header="Gestellt am"></Column>
      <Column field="prioritaet" header="Priorität"></Column>
      <Column field="status" header="Status"></Column>

      <ContextMenu :model="menuModel" ref="cm" />
    </DataTable>
  </div>
</template>

<script>
export default {
  inject: ["apiUrl"],
  beforeMount() {
    this.getApplicationsList();
    console.log(this.applicationsList);
  },
  name: "ApplicationsView",
  data() {
    return {
      applicationsList: null,
      selectedApplication: null,
      menuModel: [
        { label: "Details", icon: "pi pi-fw pi-search" },
        {
          label: "Status",
          icon: "pi pi-align-justify",
          items: [
            {
              label: "Annehmen",
              icon: "pi pi-check-circle",
              command: () => this.acceptApplication(this.selectedApplication)
            },
            {
              label: "Unvollständig",
              icon: "pi pi-exclamation-circle",
              command: () => this.incompleteApplication(this.selectedApplication)
            },            {
              label: "Ablehnen",
              icon: "pi pi-times-circle",
              command: () => this.denyApplication(this.selectedApplication)
            }
          ],
        },
      ],
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
      const response = await fetch(this.apiUrl + "applications/all");
      const data = await response.json();
      this.applicationsList = data;
    },
    onRowContextMenu(event) {
      this.$refs.cm.show(event.originalEvent);
    },
    acceptApplication(application) {
      application.status = "ANGENOMMEN"
      console.log(application, "akzeptiert")
    },
    incompleteApplication(application) {
      application.status = "UNVOLLSTAENDIG"
      console.log(application, "als unvollständig markiert")
    },
    denyApplication(application) {
      application.status = "ABGELEHNT"
      console.log(application, "abgelehnt")
    }
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
