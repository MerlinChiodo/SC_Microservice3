<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <!--        <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">-->
      </template>
      <template #end>
        <span>
          <router-link to="legal" style="color: var(--red-800)"
            >Impressum</router-link
          >
          <router-link
            style="
              margin-left: 0.5rem;
              margin-right: 1.5rem;
              color: var(--red-800);
            "
            to="privacy"
            >Datenschutz</router-link
          >
        </span>
        <Button
          v-if="!this.user.isLoggedIn && !this.user.isLoggedInEmployee"
          @click="login"
        >
          Einloggen
        </Button>
        <Button v-if="this.user.isLoggedIn" @click="logout"> Ausloggen </Button>
        <Button
          v-if="!this.user.isLoggedInEmployee && !this.user.isLoggedIn"
          @click="loginEmployee"
          icon="pi pi-key"
          style="margin-left: 6px"
        ></Button>
        <Button
          v-if="this.user.isLoggedInEmployee"
          @click="logoutEmployee"
          icon="pi pi-sign-out"
          style="margin-left: 6px"
        >
        </Button>

        <a href="http://supersmartcity.de" target="_blank">
          <img
            src="../assets/smartcity_logo_icon_50x50.png"
            alt="To landing page"
            width="50"
            height="50"
            style="size: auto; margin-bottom: -8px"
          />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  name: "NavBar",
  beforeCreate() {
    this.user = useUserStore();
  },
  data() {
    return {
      user: useUserStore(),
      items: [
        {
          label: "SmartKita",
          to: "./",
        },
        {
          label: "Kitas",
          icon: "pi pi-fw pi-home",
          items: [
            {
              label: "Suchen",
              icon: "pi pi-fw pi-search",
              to: "./searchkitas",
            },
            {
              label: "Merkliste",
              icon: "pi pi-fw pi-calendar-plus",
            },
            /*            {
              separator:true
            },*/
          ],
        },
        {
          label: "Mitgliedschaften",
          icon: "pi pi-fw pi-users",
          to: "./memberships",
          visible: () => this.user.isLoggedIn,
        },
        {
          label: "Dokumente",
          icon: "pi pi-fw pi-paperclip",
          to: "./documents",
          visible: () => this.user.isLoggedIn,
        },
        {
          label: "Mitarbeitende",
          icon: "pi pi-fw pi-briefcase",
          // disabled: !this.user.isLoggedInEmployee,
          visible: () => this.user.isLoggedInEmployee,
          items: [
            {
              label: "Anträge",
              icon: "pi pi-fw pi-inbox",
              to: "./applications",
            },
            {
              label: "Verträge",
              icon: "pi pi-fw pi-file",
              to: "./contracts",
            },
            {
              label: "SmartCity",
              icon: "pi pi-fw pi-building",
              to: "/employee",
            },
          ],
        },
        /*        {
          label: "Einloggen",
          icon: "pi pi-fw pi-sign-in",
        },*/
      ],
    };
  },
  inject: ["authUrl", "homeUrl"],
  methods: {
    login() {
      window.location.href =
        this.authUrl +
        `external?redirect_success=${this.homeUrl}&redirect_error=${this.homeUrl}`;
    },
    loginEmployee() {
      window.location.href =
        this.authUrl +
        `employee/external?redirect_success=${this.homeUrl}employee&redirect_error=${this.homeUrl}`;
    },
    logout() {
      this.$cookies.set("user_session_token", "");
      localStorage.removeItem("token");
      this.user.isLoggedIn = false;
      this.user.smartCityId = null;
      this.user.userData = null;
      this.user.token = null;
      //this.user.isEmployee = false,
      window.location.href = this.homeUrl;
    },
    logoutEmployee() {
      this.$cookies.set("employee_session_token", "");
      localStorage.removeItem("employeeToken");
      this.user.isLoggedInEmployee = false;
      this.user.smartCityId = null;
      this.user.userData = null;
      this.user.employeeToken = null;
      window.location.href = this.homeUrl;
    },
  },
};
</script>

<style scoped>
.p-menubar {
  background-color: var(--red-500);
  height: 4.5rem;
  padding: 0px;
}

.p-menubar :deep(.p-button) {
  background-color: var(--buttonDarkerColor);
}
.p-button:hover {
  background-color: var(--buttonHoverColor) !important;
}
.p-button:active,
.p-button:focus {
  background-color: var(--buttonColor) !important;
}

.p-menubar
  .p-menubar-root-list
  > .p-menuitem
  > .p-menuitem-link
  .p-menuitem-text {
  color: white !important;
}
</style>
