<template>
  <div class="membershipcontainer">
    <div class="surface-card p-4 shadow-2 border-round-md">
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-12">
          <div
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
            style="margin-bottom: 2rem"
          >
            <h1>Meine Anträge</h1>
            <div>
              <ul
                class="applicationsList"
                v-if="
                  this.userApplicationsChildrenData && this.userApplications
                "
              >
                <li
                  v-for="application in userApplications"
                  v-bind:key="application.id_antrag"
                  style="margin-bottom: 4px"
                >
                  <span
                    ><Button
                      icon="pi pi-times"
                      style="width: 8px; height: 8px"
                    ></Button>
                    ID Antrag: {{ application.id_antrag }} | Einrichtung:
                    {{ application.einrichtung.name }} | Kind:
                    {{
                      userApplicationsChildrenData.get(application.id_kind)
                        .firstname
                    }}
                    | {{ application.status }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-12">
          <div
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
            style="margin-bottom: 2rem"
          >
            <h1>Meine Mitgliedschaften</h1>
            <div>
              <ul class="contractsList">
                <li
                  v-for="contract in userContracts"
                  v-bind:key="contract.id_vertrag"
                  style="margin-bottom: 4px"
                >
                  <span
                    ><Button
                      icon="pi pi-check"
                      style="
                        width: 8px;
                        height: 8px;
                        background-color: var(--green-500);
                      "
                    ></Button>
                    ID Vertrag: {{ contract.id_vertrag }} | Einrichtung:
                    {{ contract.einrichtung.name }} | Kind:
                    {{ contract.kind.id_kind }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  name: "MembershipView",
  inject: ["apiUrl", "bbUrl"],
  async beforeMount() {
    this.userApplications = await this.getUserApplications();
    this.userApplicationsChildrenData = await this.getApplicationChildrenData(
      this.userApplications
    );
    this.userContracts = await this.getUserContracts();
  },
  data() {
    return {
      user: useUserStore(),
      userApplications: null,
      userApplicationsChildrenData: null,
      userContracts: null,
    };
  },
  methods: {
    async getUserApplications() {
      const response = await fetch(
        this.apiUrl + "applications/all/byInternalId?id=" + this.user.internalId
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    },
    async getUserContracts() {
      const response = await fetch(
        this.apiUrl + "contracts/all/byInternalId?id=" + this.user.internalId
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    },
    async getApplicationChildrenData(userApplications) {
      let childMap = new Map();
      for (let i in userApplications) {
        childMap.set(
          userApplications[i].kind.id_kind,
          userApplications[i].kind.smartcity_id
        );
      }
      // MAP FOR EACH IS VALUE, KEY
      childMap.forEach(async function (smartcity_id, id_kind) {
        const response = await fetch(
          "http://vps2290194.fastwebserver.de:9710/api" +
            "/citizen/" +
            smartcity_id
        );
        if (response.status === 200) {
          const data = await response.json();
          childMap.set(id_kind, data);
        }
      });

      return childMap;
    },
  },
};
</script>

<style scoped>
.membershipcontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}

ul {
  list-style-type: none;
}
li {
  text-align: start;
}
a:link,
a:visited {
  text-decoration: none;
  color: #2c3e50;
}

a:hover,
a:active {
  text-decoration: none;
  color: var(--buttonDarkerColor);
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
