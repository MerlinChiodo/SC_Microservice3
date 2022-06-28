<template>
  <h1>Anträge</h1>
  <div class="applicationscontainer" v-if="applicationsList">
    <!--  json dump for debugging  -->
    <!--    <p v-for="application in this.applicationsList" :key="application.id">
      {{ application }}
    </p>-->

    <DataTable
      v-if="!showDetails"
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
      <Column field="id_ezb" header="ID EZB"></Column>
      <Column field="betreuungsstunden" header="Betreuungsstunden"></Column>
      <Column field="bemerkung" header="Bemerkung"></Column>
      <Column field="datum" header="Gestellt am"></Column>
      <Column field="prioritaet" header="Priorität"></Column>
      <Column field="status" header="Status"></Column>

      <ContextMenu :model="menuModel" ref="cm" />
    </DataTable>
    <div v-if="showDetails">
      <ApplicationDetailed
        :selectedApplication="this.selectedApplication"
        :applicationsList="this.applicationsList"
        @backToApplList="this.showDetails = false"
      ></ApplicationDetailed>
    </div>
  </div>
</template>

<script>
import ApplicationDetailed from "../components/ApplicationDetailed.vue";
export default {
  components: { ApplicationDetailed },
  inject: ["apiUrl"],
  beforeMount() {
    this.getApplicationsList();
  },
  name: "ApplicationsView",
  data() {
    return {
      applicationsList: null,
      selectedApplication: null,
      showDetails: false,
      menuModel: [
        {
          label: "Details",
          icon: "pi pi-fw pi-search",
          command: () => {
            this.showDetails = true;
          },
        },
        {
          label: "Status",
          icon: "pi pi-align-justify",
          items: [
            {
              label: "Annehmen",
              icon: "pi pi-check-circle",
              command: () => this.acceptApplication(this.selectedApplication),
            },
            {
              label: "Unvollständig",
              icon: "pi pi-exclamation-circle",
              command: () =>
                this.incompleteApplication(this.selectedApplication),
            },
            {
              label: "Ablehnen",
              icon: "pi pi-times-circle",
              command: () => this.denyApplication(this.selectedApplication),
            },
            {
              label: "Eingegangen",
              icon: "pi pi-undo",
              command: () => this.resetApplication(this.selectedApplication),
            },
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
    async updateApplication(application) {
      const response = await fetch(this.apiUrl + "applications/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });
      const res = await response.json();
      console.log(res);
      this.getApplicationsList();
    },
    onRowContextMenu(event) {
      this.$refs.cm.show(event.originalEvent);
    },
    acceptApplication(application) {
      application.status = "ANGENOMMEN";
      // TODO: add toasts
      this.updateApplication(application);
    },
    incompleteApplication(application) {
      application.status = "UNVOLLSTAENDIG";
      this.updateApplication(application);
    },
    denyApplication(application) {
      application.status = "ABGELEHNT";
      this.updateApplication(application);
    },
    resetApplication(application) {
      application.status = "EINGEGANGEN";
      this.updateApplication(application);
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
