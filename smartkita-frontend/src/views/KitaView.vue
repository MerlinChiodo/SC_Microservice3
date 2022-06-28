<template>
  <KitaProfile
    v-if="this.kitaData && !this.applicationMode"
    :kitaData="this.kitaData"
    @applicationMode="this.setApplicationMode"
  ></KitaProfile>
  <ApplicationForm
    v-if="this.kitaData && this.applicationMode"
    :kitaData="this.kitaData"
    @applicationMode="this.setApplicationMode"
  ></ApplicationForm>
</template>

<script>
import KitaProfile from "../components/KitaProfile.vue";
import ApplicationForm from "../components/ApplicationForm.vue";

export default {
  components: { ApplicationForm, KitaProfile },
  created() {
    this.getKitaData(this.$route.query.id);
  },
  name: "KitaView",
  inject: ["apiUrl"],
  props: [],
  data() {
    return {
      kitaData: null,
      applicationMode: false,
    };
  },
  computed: {
    schwerpunktFormatted() {
      let schwerpunkt = this.kitaData.schwerpunkt.split("_");
      let formatted = "";
      for (let i = 0; i < schwerpunkt.length; i++) {
        formatted =
          formatted + " " + this.toLowerCaseExceptFirstChar(schwerpunkt[i]);
      }
      return formatted;
    },
  },
  methods: {
    setApplicationMode(applMode) {
      this.applicationMode = applMode;
    },
    toLowerCaseExceptFirstChar(str) {
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    },
    async getKitaData(id_einrichtung) {
      const response = await fetch(
        this.apiUrl + "kitas/?id=" + id_einrichtung,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      this.kitaData = data;
    },
  },
};
</script>

<style scoped></style>
