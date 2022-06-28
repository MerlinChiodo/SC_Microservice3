<template>
  <div v-if="debug">
    Data for debugging
    {{ this.applicationsList }}
    <br /><br />{{ this.selectedApplication.id_antrag }} <br /><br />
    {{ this.selectedApplicationData }}
    <p>EZB: {{ this.parentData }}</p>
    <p>Kind: {{ this.childData }}</p>
  </div>
  <Button @click="$emit('backToApplList')">Zurück</Button>
</template>

<script>
export default {
  name: "ApplicationDetailed",
  async beforeMount() {
    this.selectedApplicationData = await this.applicationsList.find(
      (appl) => appl.id_antrag === this.selectedApplication.id_antrag
    );
    this.parentData = await this.getApplUserData(
      this.selectedApplicationData.id_ezb
    );
    this.childData = await this.getApplUserData(
      this.selectedApplicationData.id_kind
    );
  },
  props: ["applicationsList", "selectedApplication"],
  inject: ["bbUrl"],
  emits: ["backToApplList"],
  data() {
    return {
      debug: true,
      selectedApplicationData: null,
      parentData: null,
      childData: null,
    };
  },
  methods: {
    async getApplUserData(smartcity_id) {
      const response = await fetch(this.bbUrl + "/citizen/" + smartcity_id);
      const data = await response.json();
      if (response.status == 200) {
        return data;
      } else {
        console.log(response.status);
      }
    },
  },
};
</script>

<style scoped></style>
