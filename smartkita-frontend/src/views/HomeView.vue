<template>
  <h1>Kita</h1>
  <div>
    <p>Willkommen im smarten Kita-Portal!</p>
    <p>
      Wir befinden uns noch im Aufbau, voraussichtlich bis Ende Juni/Anfang
      Juli.
    </p>
    User ID: {{ user.smartCityId }}
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
