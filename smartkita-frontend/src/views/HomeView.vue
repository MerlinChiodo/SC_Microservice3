<template>
  <div class="homecontainer">
    <h1>SmartKita</h1>
    <div v-if="this.user.isLoggedIn">
      <h2>
        Willkommen im smarten Kita-Portal, {{ user.userData.firstname }}
        {{ user.userData.lastname }}!
      </h2>
      <p>
        Es gibt viele Kitas in M*nster. Über unsere
        <router-link to="searchkitas">Kita-Suche</router-link> findest du die
        Einrichtungen, die am besten zu dir und deiner Familie passen.
      </p>
      <p>
        Du kannst nun Anträge auf einen Betreuungsplatz einreichen, am besten du
        lädst vorher die nötigen
        <router-link to="documents">Dokumente</router-link> (z.B. Impfpass,
        Vorsorgeheft oder Beschäftigungsnachweis) hoch. Diese kannst du dann
        deinen Anträgen anhängen, sodass unsere Mitarbeitenden direkt alles
        haben, was sie brauchen.
      </p>
      <p>
        Unter
        <router-link to="memberships">Mitgliedschaften</router-link> kannst du
        nachschauen, in welchen Kitas deine Kinder bereits Mitglied sind sowie
        gestellte Anträge zurückziehen.
      </p>
    </div>
    <div v-else-if="user.isLoggedInEmployee">
      <h3>Hallo Admin</h3>
      <h4>Frisch ans Werk</h4>
    </div>
    <div v-else>
      <h3>Hallo!</h3>
      <p>
        Als Gast kannst du einen Blick auf unser
        <router-link to="searchkitas">Kita-Angebot</router-link> werfen,
        allerdings keine Anträge auf einen Betreuungsplatz stellen.
      </p>
      <p>Bitte logge dich ein, um auf alle Funktionen zuzugreifen.</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  async beforeMount() {
    await this.verifyUser();
  },

  data() {
    return {
      user: useUserStore(),
    };
  },
  methods: {
    async verifyUser() {
      if (this.user.employeeToken) {
        this.$router.push("employee");
      }
      let token;
      // user login
      if (this.$route.query.token) {
        token = this.$route.query.token;
      } else if (this.user.token) {
        token = this.user.token;
      }
      if (token) {
        const response = await fetch(this.authUrl + "verify", {
          method: "POST",
          body: encodeURIComponent("code") + "=" + encodeURIComponent(token),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const data = await response.json();
        if (response.status == 200) {
          const guardianResponse = await fetch(
            this.apiUrl + "guardians/byScId/?id=" + data.citizen_id
          );
          // check if user exists in kita's DB, else create new user
          if (guardianResponse.status == 200) {
            const guardianData = await guardianResponse.json();
            this.user.internalId = guardianData.id_ezb;
            console.log("Returning user, login success");
          } else if (guardianResponse.status == 204) {
            console.log("User unknown to Kita Service. Creating new user...");
            const newGuardianResponse = await fetch(
              this.apiUrl + "guardians?id=" + data.citizen_id,
              { method: "POST" }
            );
            if (newGuardianResponse.status == 200) {
              const newGuardianData = await newGuardianResponse.json();
              this.user.internalId = newGuardianData.id_ezb;
              console.log("User successfully created. Data: ", newGuardianData);
            } else {
              console.log("User could not be created");
            }
          }
        }

        localStorage.setItem("token", data.user_session_token);
        this.user.isLoggedIn = true;
        this.user.token = data.user_session_token;
        this.user.smartCityId = data.citizen_id;
        this.user.userData = data.info;
      } else {
        console.log("Invalid token");
      }
    },
  },
  inject: ["authUrl", "homeUrl", "apiUrl"],
};
</script>
<style scoped>
.homecontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 60rem;
}
a:link,
a:visited {
  text-decoration: none;
  color: var(--buttonDarkerColor);
}

a:hover,
a:active {
  text-decoration: none;
  color: var(--buttonHoverColor);
}
</style>
