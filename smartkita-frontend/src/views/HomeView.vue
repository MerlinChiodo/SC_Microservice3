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
    // const token = this.$cookies.get("user_session_token");
    let token;
    if (this.$route.query.token) {
      token = this.$route.query.token;
    } else if (this.user.token) {
      token = this.user.token;
    }
    console.log(token);
    if (token) {
      const response = await fetch(
        "http://auth.smartcityproject.net:8080/verify",
        {
          method: "POST",
          body: encodeURIComponent("code") + "=" + encodeURIComponent(token),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        localStorage.setItem("token", data.user_session_token);
        this.user.token = data.user_session_token;
        this.user.smartCityId = data.citizen_id;
        this.user.userData = data.info;
      }
    }
  },
  data() {
    return {
      user: useUserStore(),
    };
  },
  inject: ["authUrl", "homeUrl"],
};
</script>
