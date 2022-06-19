<template>
  <div class="kitaviewcontainer">
    <div class="card">
      <h1>KitaView</h1>
      {{ this.$route.query.id }}
      <h3>Daten</h3>
      {{ this.kitaData }}
    </div>

    <div
      class="surface-card p-4 shadow-2 border-round"
      v-if="this.kitaData != null"
    >
      <div class="text-3xl font-medium text-900 mb-3">
        {{ this.kitaData.name }}
      </div>
      <div class="font-medium text-500 mb-3">
        {{ this.kitaData.kurzbeschreibung }}
      </div>
      <div class="flex justify-content-center">
        <div>{{ this.kitaData.kurzbeschreibung }}</div>
        <Divider layout="vertical" />
        <div>Content 2</div>
        <br /><br /><br />
      </div>
      <div
        style="height: 150px"
        class="border-2 border-dashed surface-border"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.getKitaData(this.$route.query.id);
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

<style scoped>
.kitaviewcontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
