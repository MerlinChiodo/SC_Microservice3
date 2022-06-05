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


export default {
  name: "EmployeeView",
  components: {EventFormStadtbus, EventFormLandingPage, EventFormForum},
};
</script>

<style scoped>
.employeecontainer {
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  text-align: center;
}

/* How to get into Primevue component styles */
.employeecontainer :deep(.p-accordion-content){
}
.employeecontainer :deep(.p-accordion-content) label{
  font-size: 0.9rem;
  text-align: left;
}

.employeecontainer :deep(.p-accordion-content) .p-button{
  background-color: var(--buttonColor);
}

.employeecontainer :deep(.p-accordion-content) .p-button:hover{
  background-color: var(--buttonHoverColor);
}
</style>
