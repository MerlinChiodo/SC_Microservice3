<template>
  <div class="grid p-fluid">
    <div
      class="col-12 md:col-4 flex flex-wrap align-items-center justify-content-center"
    >
      <h1>
        Gruppenticket <br />
        anfordern
      </h1>
    </div>
    <div class="col-12 md:col-8">
      <div class="p-inputgroup">
        <InputText
          v-model="kita_responsible"
          type="text"
          id="kitaresponsible"
          placeholder="Kita"
        ></InputText>
        <InputText
          v-model="person_responsible"
          type="text"
          id="person_responsible"
          placeholder="Verantwortlich*er"
        ></InputText>
      </div>
      <div class="p-inputgroup">
        <span class="p-float-label">
          <label for="date">Datum</label>
          <Calendar v-model="date" id="date"></Calendar>
        </span>

        <InputNumber
          v-model="number_of_passengers"
          id="number_of_passengers"
          :min="1"
          :max="100"
          placeholder="Passagiere"
        ></InputNumber>
      </div>
      <Knob
        v-model="number_of_passengers"
        :min="1"
        :max="100"
        :size="75"
        value-color="var(--buttonColor)"
        :show-value="false"
      ></Knob>

      <Button
        style="width: auto"
        class="p-button-raised"
        @click="
          stadtbusSendTicketInquiry(
            number_of_passengers,
            person_responsible,
            kita_responsible,
            date.toISOString()
          )
        "
      >
        Senden
      </Button>
    </div>
  </div>
</template>

<script>
import { stadtbusSendTicketInquiry } from "../controllers/eventsController";
export default {
  data() {
    return {
      /* "required": ["event_id", "event_name","service_name","number_of_passengers", "person_responsible","date"] */
      title: "new kita inquiry",
      description: "Schema for the event to receive a new kita inquiry",
      event_id: 3001,
      event_name: "New Kita Inquiry",
      service_name: "kita",
      number_of_passengers: 1 /* form */,
      person_responsible: "" /* form/grab id from login */,
      kita_responsible: "" /* form/grab id from login */,
      date: new Date() /* form */,
    };
  },
  methods: {
    stadtbusSendTicketInquiry,
  },
};
</script>

<style scoped></style>
