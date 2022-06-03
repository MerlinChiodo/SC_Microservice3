<template>
  <h3>"About Us" ändern</h3>

    <span class="p-float-label">
      <label for="aboutus">"About Us"-Text</label>
      <InputText
        v-model="about_us"
        type="text"
        id="aboutus"
      ></InputText>
    </span>
    <span class="p-float-label">
      <label for="url">Service-URL</label>
      <InputText v-model="url" type="text" id="url"></InputText>
    </span>

    <span class="p-float-label">
      <label for="picture">Bild</label>
      <InputText v-model="picture" type="text" id="picture"></InputText>
    </span>


  <Button
    class="p-button-raised p-button-rounded"
    @click="landingpageSendChangeAboutUs(about_us, url, picture, new Date().toISOString())"
  >
    Senden
  </Button>
</template>

<script>
import { landingpageSendChangeAboutUs } from "../controllers/eventsController";
export default {
  data() {
    return {
      /* "required": ["event_id", "event_name","service_name","number_of_passengers", "person_responsible","date"] */
      title: "Change About Us",
      description: "Schema for the event to change the about us",
      event_id: 3002,
      event_name: "Updated About US",
      service_name: "kita",
      picture: "" /* form */,
      url: "" /* form/grab id from login */,
      about_us: "" /* form/grab id from login */,
    };
  },
  methods: {
    landingpageSendChangeAboutUs,
  },
};
</script>

<style scoped></style>
