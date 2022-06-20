<template>
  <div class="grid p-fluid">
    <div
      class="col-12 md:col-4 flex flex-wrap align-items-center justify-content-center"
    >
      <h1>
        "About Us" <br />
        ändern
      </h1>
    </div>
    <div class="col-12 md:col-8">
      <div class="p-inputgroup">
        <InputText
          v-model="about_us"
          type="text"
          id="aboutus"
          placeholder='"About-Us"-Text'
        ></InputText>
      </div>
      <div class="p-inputgroup">
        <InputText
          v-model="url"
          type="text"
          id="url"
          placeholder="Service-URL"
        ></InputText>
        <InputText
          v-model="picture"
          type="text"
          id="picture"
          placeholder="Bild-URL"
        ></InputText>
      </div>
      <Button
        style="width: auto"
        class="p-button-raised"
        @click="
          landingpageSendChangeAboutUs(
            about_us,
            url,
            picture,
            new Date().toISOString()
          )
        "
      >
        Senden
      </Button>
    </div>
  </div>
</template>

<script>
import { landingpageSendChangeAboutUs } from "../controllers/eventsController";
export default {
  data() {
    return {
      title: "Change About Us",
      description: "Schema for the event to change the about us",
      event_id: 3002,
      event_name: "Updated About US",
      service_name: "kita",
      picture: "",
      url: "",
      about_us: "",
    };
  },
  methods: {
    landingpageSendChangeAboutUs,
  },
};
</script>

<style scoped></style>
