<template>
  <div>
  <h1>Debug Events</h1>
  <h3>Stadtbus</h3>
  <button @click="stadtbusTicketInquiry">send TicketInquiry</button>
  </div>
</template>

<script>
export default {
  name: "DebugEvents",
  methods: {
    async stadtbusTicketInquiry() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: 3001,
          event_name: "New Kita Inquiry",
          service_name: "kita",
          number_of_passengers: 999,
          person_responsible: "Hans Merkel",
          date: "08.05.2022",
        }),
      };
      const response = await fetch(`http://localhost:3001/events/stadtbus/ticketinquiry`, requestOptions);
      const data = await response.json();
      this.ticketResponse = data;
    },
  },
};
</script>

<style scoped></style>
