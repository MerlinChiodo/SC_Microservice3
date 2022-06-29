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
    let token;
    let employeeToken;

    // Employee login
    if (this.$route.query.employee) {
      if (this.$route.query.token) {
        employeeToken = this.$route.query.token;
      } else if (this.user.employeeToken) {
        employeeToken = this.user.employeeToken;
      }
      if (employeeToken) {
        const response = await fetch(this.authUrl + "employee/verify", {
          method: "POST",
          body:
            encodeURIComponent("code") +
            "=" +
            encodeURIComponent(employeeToken),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const data = await response.json();
        if (response.status == 200) {
          localStorage.setItem("token", data.user_session_token);
          this.user.isLoggedInEmployee = true;
          this.user.employeeToken = data.user_session_token;
          this.user.employeeId = data.id;
          this.user.employeeData = data.info;
        }
      }
    }

    // user login
    else if (this.$route.query.token) {
      token = this.$route.query.token;
    } else if (this.user.token) {
      token = this.user.token;
    }
    console.log(token);
    if (token) {
      const response = await fetch(this.authUrl + "verify", {
        method: "POST",
        body: encodeURIComponent("code") + "=" + encodeURIComponent(token),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = await response.json();
      if (response.status == 200) {
        console.log(data);
        localStorage.setItem("token", data.user_session_token);
        this.user.isLoggedIn = true;
        this.user.token = data.employee_session_token;
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
