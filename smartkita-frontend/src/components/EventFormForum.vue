<template>
  <div>
    <h3>Beitrag senden</h3>
    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
      <InputText v-model="title" type="text" id="title" placeholder="Titel"></InputText>
    <InputText v-model="picture_url" type="text" id="picture" placeholder="Bild-URL"></InputText>
          </div>
      <Textarea
        v-model="short_description"
        id="short_description"
        rows="2"
        cols="40"
        placeholder="Kurzbeschreibung"
      ></Textarea>
      <Textarea
        v-model="long_description"
        id="long_description"
        rows="5"
        cols="40"
        placeholder="Langbeschreibung"
      ></Textarea>
      <Calendar v-model="date" id="date"></Calendar>
          </div>
</div>
    <Button
      class="p-button-raised"
      @click="
        forumSendCalendarEntry(
          title,
          short_description,
          long_description,
          date,
          picture_url
        )
      "
    >
      Kalender-Beitrag senden
    </Button>
    <Button
      class="p-button-raised"
      @click="
        forumSendNewsletterPost(
          title,
          short_description,
          long_description,
          picture_url
        )
      "
    >
      Forum-Beitrag senden
    </Button>
  </div>
</template>

<script>
import {
  forumSendCalendarEntry,
  forumSendNewsletterPost,
} from "../controllers/eventsController";
export default {
  data() {
    return {
      description: "Schema for the event to change the about us",
      event_id: 3003,
      event_name: "newServicePost",
      service: "kita",
      title: "",
      short_description: "",
      long_description: "",
      date: new Date(),
      picture_url: "" /* form */,
    };
  },
  methods: {
    forumSendCalendarEntry,
    forumSendNewsletterPost,
  },
};
</script>

<style scoped></style>
