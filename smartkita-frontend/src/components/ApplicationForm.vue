<template>
  <div class="applicationFormContainer" v-if="this.userData">
    <div class="surface-card p-4 shadow-2 border-round-md">
      <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-start w-8rem"></div>
        <div
          class="text-3xl font-medium text-900 mb-3 flex align-items-center justify-content-center"
        >
          <span style="color: var(--red-600); font-weight: bold"
            >Antrag stellen bei:&nbsp;</span
          >
          {{ this.kitaData.name }}
        </div>
        <div class="flex align-items-center justify-content-end w-8rem">
          <Button type="button" icon="pi pi-bookmark"></Button>
          <Button
            type="button"
            icon="pi pi-backward"
            style="margin-left: 3px"
            @click="$emit('applicationMode', false)"
          ></Button>
        </div>
      </div>
      <div class="font-medium text-500 mb-3">
        {{ this.kitaData.traeger }} |
        {{
          toLowerCaseExceptFirstChar(
            kitaData.traeger_kategorie
          ) /* enum is sent as uppercase */
        }}
      </div>
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-4">
          <div
            v-if="userData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Erziehungsberechtigte*r</h4>
            <span>{{ userData.firstname + " " + userData.lastname }}</span>
            <span>{{
              "geb. " + new Date(userData.birthdate).toISOString().split("T")[0]
            }}</span>
            <h5>Wohnort</h5>
            <span>{{
              userData.address.street + " " + userData.address.housenumber
            }}</span>
            <span>{{
              userData.address.city_code + " " + userData.address.city
            }}</span>
          </div>
        </div>

        <div class="col-12 md:col-5">
          <div
            v-if="userChildrenData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <span v-if="!selectedChild">
              Für welches Ihrer Kinder möchten Sie einen Kita-Antrag stellen?
            </span>
            <div class="flex flex-wrap">
              <div
                class="flex align-items-center justify-content-center"
                style="font-weight: bold"
              >
                Kind
              </div>
              <div class="flex align-items-center justify-content-center">
                <Dropdown
                  v-if="userChildrenData"
                  v-model="selectedChild"
                  :options="userChildrenData"
                  optionLabel="firstname"
                  placeholder="Kind auswählen"
                  style="margin: 18px"
                />
              </div>
            </div>
            <div v-if="selectedChild">
              <span>{{
                selectedChild.firstname + " " + selectedChild.lastname
              }}</span
              ><br />
              <span>{{
                "geb. " +
                new Date(selectedChild.birthdate).toISOString().split("T")[0]
              }}</span>
              <h5>Wohnort</h5>
              <span>{{
                selectedChild.address.street +
                " " +
                selectedChild.address.housenumber
              }}</span
              ><br />
              <span>{{
                selectedChild.address.city_code +
                " " +
                selectedChild.address.city
              }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-3">
          <div
            v-if="userChildrenData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Betreuungsstunden</h4>
            <Knob
              v-model="betreuungsstunden"
              :min="20"
              :max="45"
              :step="5"
              value-color="var(--buttonColor)"
            />
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            v-if="userChildrenData"
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Bemerkung</h4>
            <Textarea
              v-model="bemerkung"
              :autoResize="true"
              rows="12"
              cols="30"
              style="max-width: 90%; max-height: 50%"
            />
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            v-if="userChildrenData"
            class="border-2 border-round-md border-dotted surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Dokumente anfügen</h4>
            <DocumentPicker
              @updateSelectedDocuments="this.updateSelectedDocuments"
            ></DocumentPicker>
          </div>
        </div>
        <div class="col-12 md:col-12">
          <Button
            style="width: auto"
            class="p-button-raised"
            @click="
              createApplication(
                this.kitaData.id_einrichtung,
                this.bemerkung,
                this.selectedChild.citizen_id,
                this.userData.citizen_id,
                this.betreuungsstunden,
                this.selectedDocuments
              )
            "
            >Antrag einreichen</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import DocumentPicker from "./DocumentPicker.vue";

export default {
  name: "ApplicationForm",
  components: { DocumentPicker },
  props: ["kitaData"],
  inject: ["bbUrl", "apiUrl"],
  emits: ["applicationMode"],
  created() {
    this.getUserData(this.user.smartCityId).then(() =>
      this.getChildrenData(this.userData.child_ids)
    );
  },
  data() {
    return {
      uploadUrl: this.apiUrl + "documents",
      user: useUserStore(),
      userData: null,
      userChildrenData: null,
      selectedChild: null,
      betreuungsstunden: 20,
      bemerkung: "",
      selectedDocuments: [],
    };
  },
  computed: {
    schwerpunktFormatted() {
      let schwerpunkt = this.kitaData.schwerpunkt.split("_");
      let formatted = "";
      for (let i = 0; i < schwerpunkt.length; i++) {
        formatted =
          formatted + " " + this.toLowerCaseExceptFirstChar(schwerpunkt[i]);
      }
      return formatted;
    },
  },
  methods: {
    toLowerCaseExceptFirstChar(str) {
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    },
    async getUserData(userId) {
      const response = await fetch(this.bbUrl + "/citizen/" + userId);
      const data = await response.json();
      if (response.status == 200) {
        this.userData = data;
      } else {
        console.log(response.status);
      }
    },
    async getChildrenData(childIdList) {
      let childrenData = [];
      childIdList.forEach(async (childId) => {
        const response = await fetch(this.bbUrl + "/citizen/" + childId);
        const data = await response.json();
        if (response.status == 200) {
          childrenData.push(data);
        }
      });
      this.userChildrenData = childrenData;
    },
    async createApplication(
      id_einrichtung,
      bemerkung,
      id_kind,
      id_ezb,
      betreuungsstunden,
      dokumente
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_einrichtung: id_einrichtung,
          bemerkung: bemerkung,
          id_kind: id_kind,
          id_ezb: id_ezb,
          betreuungsstunden: betreuungsstunden,
          dokumente: dokumente,
        }),
      };
      const response = await fetch(
        this.apiUrl + "applications",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    },
    updateSelectedDocuments(selectedDocuments) {
      this.selectedDocuments = selectedDocuments;
    },
  },
};
</script>

<style scoped>
.applicationFormContainer {
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
</style>
