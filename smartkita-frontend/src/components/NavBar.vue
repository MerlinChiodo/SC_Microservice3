<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <!--        <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">-->
      </template>
      <template #end>
        <Button @click="login"> Einloggen </Button>
        <a href="http://vps2290194.fastwebserver.de:9800" target="_blank">
          <img
            src="../assets/smartcity_logo_icon_50x50.png"
            alt="To landing page"
            width="50"
            height="50"
            style="margin-top: 5px"
          />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
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
          label: "Anträge",
          icon: "pi pi-fw pi-copy",
          items: [
            { label: "Eingang", icon: "pi pi-inbox", to: "./applications" },
            {
              label: "Verträge",
              icon: "pi pi-file",
              // to: VERTRAGSVERWALTUNG
            },
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
          to: "/employee",
        },
        {
          label: "Einloggen",
          icon: "pi pi-fw pi-sign-in",
        },
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

.customButton {
}
</style>
