<template>
  <div class="applicationscontainer">
    <p>{{ this.applicationsList }}</p>
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
  methods: {
    async getApplicationsList() {
      /* Hardcoding for now, will use pinia later */
      /*"http://vps2290194.fastwebserver.de:9730/api/applications"*/
      const response = await fetch("http://vps2290194.fastwebserver.de:9730/api/applications");
      const data = await response.json();
      this.applicationsList = data;

    },
  },
};
</script>

<style scoped></style>
