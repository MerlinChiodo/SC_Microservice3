<template>
  <div>
    <h3>Beitrag senden</h3>
    <span class="p-float-label">
      <label for="title">Titel</label>
      <InputText v-model="title" type="text" id="title"></InputText>
    </span>
    <span class="p-float-label">
      <label for="short_description">Kurzbeschreibung</label>
      <Textarea
        v-model="short_description"
        id="short_description"
        rows="2"
        cols="40"
      ></Textarea>
    </span>
    <span class="p-float-label">
      <label for="long_description">Langbeschreibung</label>
      <Textarea
        v-model="long_description"
        id="long_description"
        rows="5"
        cols="40"
      ></Textarea>
    </span>
    <span class="p-float-label">
      <label for="date">Datum<br />(nur bei Kalender-Beitrag)</label>
      <Calendar v-model="date" id="date"></Calendar>
    </span>
    <span class="p-float-label">
      <label for="pictureurl">Bild</label>
      <InputText v-model="picture_url" type="text" id="picture"></InputText>
    </span>

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
