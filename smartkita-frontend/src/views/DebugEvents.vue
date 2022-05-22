<template>
  <div>
    <h1>Debug Events</h1>
    <h3>Stadtbus</h3>
    <button @click="stadtbusSendTicketInquiry">send TicketInquiry</button>
    <h3>Forum</h3>
    <button @click="forumSendCalendarEntry">send CalendarEntry</button>
  </div>
</template>

<script>
import {
  stadtbusSendTicketInquiry,
  forumSendCalendarEntry,
} from "../controllers/debugEventsController";
export default {
  name: "DebugEvents",
  methods: {
    stadtbusSendTicketInquiry,
    forumSendCalendarEntry,
  },
};
</script>

<style scoped></style>
