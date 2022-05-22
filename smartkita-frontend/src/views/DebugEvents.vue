<template>
  <div>
    <h1>Debug Events</h1>
    <h3>Stadtbus</h3>
    <button @click="stadtbusSendTicketInquiry">send Ticket Inquiry</button>
    <h3>Forum</h3>
    <button @click="forumSendCalendarEntry">send Calendar Entry</button>
    <button @click="forumSendNewsletterPost">send Newsletter Post</button>
    <h3>Landing Page</h3>
    <button @click="landingpageSendChangeAboutUs">change About Us</button>
  </div>
</template>

<script>
import {
  stadtbusSendTicketInquiry,
  forumSendCalendarEntry,
  forumSendNewsletterPost,
  landingpageSendChangeAboutUs,
} from "../controllers/debugEventsController";
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

<style scoped></style>
