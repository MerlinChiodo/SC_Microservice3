<template>
  <div v-if="debug">
    Data for debugging
    {{ this.applicationsList }}
    <br /><br />{{ this.selectedApplication.id_antrag }} <br /><br />
    {{ this.selectedApplicationData }}
    <p>EZB: {{ this.parentData }}</p>
    <p>Kind: {{ this.childData }}</p>
  </div>
  <div
    class="applicationDetailedContainer"
    v-if="this.selectedApplicationData && this.parentData && this.childData"
  >
    <div class="surface-card p-4 shadow-2 border-round-md">
      <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-start w-8rem"></div>
        <div
          class="text-3xl font-medium text-900 mb-3 flex align-items-center justify-content-center"
        >
          <span style="font-weight: bold"
            >Antrag #{{ this.selectedApplicationData.id_antrag }}</span
          >
        </div>
        <div class="flex align-items-center justify-content-end w-8rem">
          <Button
            type="button"
            icon="pi pi-backward"
            style="margin-left: 3px"
            @click="$emit('backToApplList')"
          ></Button>
        </div>
      </div>
      <div class="font-medium text-500 mb-3">
        {{ this.selectedApplicationData.status }}
      </div>
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-4">
          <div
            v-if="parentData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Erziehungsberechtigte*r</h4>
            <span>{{ parentData.firstname + " " + parentData.lastname }}</span>
            Geschlecht: {{ this.parentData.gender }}
            <span>{{
              "geb. " +
              new Date(parentData.birthdate).toISOString().split("T")[0]
            }}</span>
            <h5>Kontakt</h5>
            <span>{{
              parentData.address.street + " " + parentData.address.housenumber
            }}</span>
            <span>{{
              parentData.address.city_code + " " + parentData.address.city
            }}</span>
            <p>{{ parentData.email }}</p>
          </div>
        </div>

        <div class="col-12 md:col-4">
          <div
            v-if="childData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <div class="flex flex-wrap">
              <div
                class="flex align-items-center justify-content-center"
                style="font-weight: bold"
              >
                <h4>Kind</h4>
              </div>
            </div>
            <div v-if="childData">
              <span>{{ childData.firstname + " " + childData.lastname }}</span
              ><br />
              <span>Geschlecht: {{ this.parentData.gender }}</span
              ><br />
              <span>{{
                "geb. " +
                new Date(childData.birthdate).toISOString().split("T")[0]
              }}</span>
              <h5>Wohnort</h5>
              <span>{{
                childData.address.street + " " + childData.address.housenumber
              }}</span
              ><br />
              <span>{{
                childData.address.city_code + " " + childData.address.city
              }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            v-if="selectedApplicationData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Antragsdetails</h4>
            <span
              >Gestellt am:
              {{ this.selectedApplicationData.datum.split("T")[0] }}</span
            >
            <span
              >Betreuungsstunden:
              {{ this.selectedApplicationData.betreuungsstunden }}</span
            >
            <span v-if="this.selectedApplicationData.id_einrichtung"
              >Einrichtung:
              {{ this.selectedApplicationData.einrichtung.name }}</span
            >
            <div v-if="!this.selectedApplicationData.id_einrichtung">
              <p>
                <ApplicationKitaSelector
                  :selectedApplication="this.selectedApplication"
                  @assignKita="assignKita"
                ></ApplicationKitaSelector>
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            v-if="selectedApplicationData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Bemerkung (Antrag)</h4>
            <p>{{ this.selectedApplicationData.bemerkung }}</p>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            v-if="selectedApplicationData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Dokumente</h4>
            <p>(dem Antrag angehängte Dokumente)</p>
          </div>
        </div>

        <div class="col-12 md:col-8">
          <div
            v-if="selectedApplicationData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4 style="color: var(--red-600); font-weight: bold">
              Bitte Bemerkung für den Vertrag eintragen
            </h4>
            <Textarea
              v-model="contractComment"
              :autoResize="true"
              rows="12"
              cols="30"
              style="max-width: 90%; max-height: 50%"
            />
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            v-if="selectedApplicationData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4 style="color: var(--red-600); font-weight: bold">
              Bitte Vertragsdauer eintragen (in Monaten)
            </h4>
            <Knob
              v-model="contractDuration"
              :min="3"
              :max="36"
              :step="1"
              value-color="var(--buttonColor)"
            />
          </div>
        </div>
      </div>

      <div class="p-buttonset" style="margin-top: 16px">
        <Button
          label="Annehmen"
          icon="pi pi-check-circle"
          iconPos="left"
          @click="
            $emit(
              'acceptApplication',
              this.selectedApplication,
              this.contractDuration,
              this.contractComment
            )
          "
        ></Button>
        <Button
          label="Unvollständig"
          icon="pi pi-exclamation-circle"
          @click="
            $emit('changeStatus', this.selectedApplication, 'UNVOLLSTAENDIG')
          "
        ></Button>
        <Button
          label="Ablehnen"
          icon="pi pi-times-circle"
          @click="$emit('changeStatus', this.selectedApplication, 'ABGELEHNT')"
        ></Button>
        <Button
          label="Eingegangen"
          icon="pi pi-undo"
          @click="
            $emit('changeStatus', this.selectedApplication, 'EINGEGANGEN')
          "
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicationKitaSelector from "./ApplicationKitaSelector.vue";
export default {
  name: "ApplicationDetailed",
  components: { ApplicationKitaSelector },
  async beforeMount() {
    this.selectedApplicationData = await this.applicationsList.find(
      (appl) => appl.id_antrag === this.selectedApplication.id_antrag
    );
    this.parentData = await this.getPersonData(
      this.selectedApplicationData.id_ezb,
      "guardian"
    );
    this.childData = await this.getPersonData(
      this.selectedApplicationData.id_kind,
      "child"
    );
  },
  props: ["applicationsList", "selectedApplication"],
  inject: ["bbUrl", "apiUrl"],
  emits: ["backToApplList", "changeStatus", "acceptApplication", "newKitaId"],
  data() {
    return {
      debug: false,
      selectedApplicationData: null,
      parentData: null,
      childData: null,
      contractComment: null,
      contractDuration: 12,
    };
  },
  methods: {
    async getPersonData(internalId, personType) {
      let endpoint = null;
      if (personType === "guardian") {
        endpoint = "guardians?id=";
      } else if (personType === "child") {
        endpoint = "children?id=";
      }
      const responseInternal = await fetch(this.apiUrl + endpoint + internalId);
      const dataInternal = await responseInternal.json();
      const smartcity_id = dataInternal.smartcity_id;

      const response = await fetch(this.bbUrl + "/citizen/" + smartcity_id);
      const data = await response.json();
      if (response.status == 200) {
        return data;
      } else {
        console.log(response.status);
      }
    },
    async assignKita(kitaId) {
      console.log("assign kita", kitaId);
      let updatedApplication = this.selectedApplicationData;

      updatedApplication.id_einrichtung = kitaId;
      console.log(updatedApplication);
      this.$emit("newKitaId", updatedApplication);
    },
    /*    async updateApplication(newStatus) {
      let updatedApplication = this.selectedApplicationData;
      updatedApplication.status = newStatus;

      const response = await fetch(this.apiUrl + "applications/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedApplication),
      });
      const res = await response.json();
      console.log(res);
    },*/
  },
};
</script>

<style scoped>
.applicationDetailedContainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
.p-button,
.p-button-raised {
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
