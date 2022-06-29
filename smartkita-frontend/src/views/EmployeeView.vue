<template>
  <div class="employeecontainer">
    <h1>Funktionen für Mitarbeitende</h1>

    <Accordion :multiple="true">
      <AccordionTab header="Stadtbus">
        <div>
          <EventFormStadtbus></EventFormStadtbus>
        </div>
      </AccordionTab>

      <AccordionTab header="Forum">
        <div>
          <EventFormForum></EventFormForum>
        </div>
      </AccordionTab>

      <AccordionTab header="Landing Page">
        <div>
          <EventFormLandingPage></EventFormLandingPage>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script>
import EventFormStadtbus from "../components/EventFormStadtbus.vue";
import EventFormLandingPage from "../components/EventFormLandingPage.vue";
import EventFormForum from "../components/EventFormForum.vue";
import { useUserStore } from "../stores/user";

export default {
  async beforeMount() {
    // Employee login
    let employeeToken;
    if (this.$route.query.token) {
      employeeToken = this.$route.query.token;
    } else if (this.user.employeeToken) {
      employeeToken = this.user.employeeToken;
    }
    if (employeeToken) {
      const response = await fetch(this.authUrl + "employee/verify", {
        method: "POST",
        body:
          encodeURIComponent("code") + "=" + encodeURIComponent(employeeToken),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = await response.json();
      if (response.status == 200) {
        localStorage.setItem("employeeToken", data.employee_session_token);
        this.user.isLoggedInEmployee = true;
        this.user.employeeToken = data.employee_session_token;
        this.user.employeeId = data.id;
        this.user.employeeData = data.info;
      } else {
        console.log("employee login failed");
        window.location.href = this.homeUrl;
      }
    }
  },
  data() {
    return {
      user: useUserStore(),
    };
  },
  name: "EmployeeView",
  inject: ["homeUrl", "authUrl"],
  components: { EventFormStadtbus, EventFormLandingPage, EventFormForum },
};
</script>

<style scoped>
.employeecontainer {
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  text-align: center;
}

/* How to get into Primevue component styles */
.employeecontainer :deep(.p-accordion-content) {
}
.employeecontainer :deep(.p-accordion-content) label {
  font-size: 0.9rem;
  text-align: left;
}

.employeecontainer :deep(.p-accordion-content) .p-button {
  margin: 1rem;
  background-color: var(--buttonColor);
}

.employeecontainer :deep(.p-accordion-content) .p-button:hover {
  background-color: var(--buttonHoverColor);
}

.employeecontainer :deep(.p-inputtext, .p-inputnumber) {
  margin-bottom: 1rem !important;
  margin-left: 0.2rem !important;
  margin-right: 0.2rem !important;
}
</style>
