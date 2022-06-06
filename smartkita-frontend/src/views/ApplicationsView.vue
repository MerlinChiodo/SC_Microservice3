<template>
  <div class="applicationscontainer">
      <p v-for="application in this.applicationsList" :key="application.id">{{application}}</p>
  </div>
</template>

<script>

export default {
  beforeMount() {
    this.getApplicationsList();
  },
  name: "ApplicationsView",
  data() {
    return {
      applicationsList: null,
    };
  },
  computed: {
    /* might delete later */
    applicationsListFormatted() {
      return JSON.stringify(this.applicationsList, null, 2)
    }
  },
  methods: {
    async getApplicationsList() {
      /* Hardcoding for now, will use pinia later */
      /*"http://vps2290194.fastwebserver.de:9730/api/applications/all"*/
      /*"http://localhost:3001/api/applications/all*/
      const response = await fetch("http://localhost:3001/api/applications/all");
      const data = await response.json();
      this.applicationsList = data;

    },
  },
};
</script>

<style scoped></style>
