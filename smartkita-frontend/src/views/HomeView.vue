<template>
  <h1>Kita</h1>
  <div>
    <p>Willkommen im smarten Kita-Portal!</p>
    <p>
      Wir befinden uns noch im Aufbau, voraussichtlich bis Ende Juni/Anfang
      Juli.
    </p>
    User ID: {{ user.id }}
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  async mounted() {
    // const token = this.$cookies.get("user_session_token");
    const token = this.$route.query.token;
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
      this.loggedIn = response.status !== 404;
      console.log("logged in: ", this.loggedIn);
    }
  },
  data() {
    return {
      user: useUserStore(),
      loggedIn: false,
    };
  },
  inject: ["authUrl", "homeUrl"],
};
</script>
