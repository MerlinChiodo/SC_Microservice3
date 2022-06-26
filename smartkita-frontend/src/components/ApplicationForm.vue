<template>
  <div class="applicationFormContainer" v-if="this.userData">
    <div class="surface-card p-4 shadow-2 border-round">
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
            class="border-2 border-round surface-border flex flex-column align-items-center justify-content-center h-full"
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
            class="border-2 border-round surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Kind</h4>
            <span v-if="!selectedChild">
              Für welches Ihrer Kinder möchten Sie einen Kita-Antrag stellen?
            </span>
            <Dropdown
              v-if="userChildrenData"
              v-model="selectedChild"
              :options="userChildrenData"
              optionLabel="firstname"
              placeholder="Kind auswählen"
              style="margin: 18px"
            />
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
      </div>
    </div>
  </div>
  <!--  <div>
    <h5>Debug data (ApplicationForm)</h5>
    {{ this.userData }}
    <h5>Children</h5>
    <div v-if="userChildrenData">{{ this.userChildrenData }}</div>
  </div>-->
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  name: "ApplicationForm",
  props: ["kitaData"],
  inject: ["bbUrl"],
  emits: ["applicationMode"],
  created() {
    this.getUserData(this.user.smartCityId).then(() =>
      this.getChildrenData(this.userData.child_ids)
    );
  },
  data() {
    return {
      user: useUserStore(),
      userData: null,
      userChildrenData: null,
      selectedChild: null,
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
