<template>
  <div class="employeecontainer">
    <h1>Funktionen für Mitarbeitende</h1>

    <Accordion :multiple="true">
      <AccordionTab header="Stadtbus">
        <EventFormStadtbus></EventFormStadtbus>

      </AccordionTab>

      <AccordionTab header="Forum">
        <Button
          class="p-button-raised p-button-rounded"
          @click="forumSendCalendarEntry"
          >send Calendar Entry</Button
        >
        <br /><br />
        <Button
          class="p-button-raised p-button-rounded"
          @click="forumSendNewsletterPost"
          >send Newsletter Post</Button
        >
      </AccordionTab>

      <AccordionTab header="Landing Page">
        <Button
          class="p-button-raised p-button-rounded"
          @click="landingpageSendChangeAboutUs"
          >change About Us</Button
        >
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script>
import {
  forumSendCalendarEntry,
  forumSendNewsletterPost,
  landingpageSendChangeAboutUs,
} from "../controllers/eventsController";
import EventFormStadtbus from "../components/EventFormStadtbus.vue";

export default {
  name: "EmployeeView",
  components: {EventFormStadtbus},
  methods: {
    forumSendCalendarEntry,
    forumSendNewsletterPost,
    landingpageSendChangeAboutUs,
  },
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
</style>
