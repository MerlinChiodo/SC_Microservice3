<template>
  <div class="employeecontainer">
    <h1>Funktionen für Mitarbeitende</h1>

    <Accordion :multiple="true">
      <AccordionTab header="Stadtbus">
        <Button
          class="p-button-raised p-button-rounded"
          @click="stadtbusSendTicketInquiry"
        >
          send Ticket Inquiry
        </Button>
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
  stadtbusSendTicketInquiry,
  forumSendCalendarEntry,
  forumSendNewsletterPost,
  landingpageSendChangeAboutUs,
} from "../controllers/eventsController";

export default {
  name: "DebugEvents",
  methods: {
    stadtbusSendTicketInquiry,
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
  max-width: 25rem;
  text-align: center;
}
</style>
