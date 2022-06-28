<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <!--        <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">-->
      </template>
      <template #end>
        <Button v-if="!this.user.isLoggedIn" @click="login"> Einloggen </Button>
        <Button v-else @click="logout"> Ausloggen </Button>
        <a href="http://vps2290194.fastwebserver.de:9800" target="_blank">
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
        },
        {
          label: "Dokumente",
          icon: "pi pi-fw pi-paperclip",
        },
        {
          label: "Mitarbeitende",
          icon: "pi pi-fw pi-briefcase",
          disabled: !this.user.isEmployee,
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
    logout() {
      this.$cookies.set("user_session_token", "");
      localStorage.removeItem("token");
      this.user.isLoggedIn = false;
      (this.user.smartCityId = null),
        (this.user.userData = null),
        (this.user.token = null),
        //this.user.isEmployee = false,
        location.reload();
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
