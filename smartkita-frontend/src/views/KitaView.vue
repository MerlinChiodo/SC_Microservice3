<template>
  <div class="card">
    <h1>KitaView</h1>
    {{ this.$route.params }}
    <h3>Daten</h3>
    {{ this.kitaData }}
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.getKitaData(this.$route.params.kitaId);
  },
  name: "KitaView",
  inject: ["apiUrl"],
  props: [],
  data() {
    return {
      kitaData: null,
    };
  },
  methods: {
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
