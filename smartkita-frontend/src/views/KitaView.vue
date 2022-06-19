<template>
  <div class="kitaviewcontainer">
    <div class="card">
      <h1>KitaView</h1>
      {{ this.$route.query.id }}
      <h3>Daten</h3>
      {{ this.kitaData }}<br /><br />
    </div>

    <div class="surface-card p-4 shadow-2 border-round" v-if="this.kitaData">
      <div class="text-3xl font-medium text-900 mb-3">
        {{ this.kitaData.name }}
      </div>
      <div class="font-medium text-500 mb-3">
        {{ this.kitaData.traeger }} |
        {{
          toLowerCaseExceptFirstChar(kitaData.traeger_kategorie) /* enum is sent as uppercase */
        }}
      </div>
      <!--      <div class="flex justify-content-center">
        <div>{{ this.kitaData.kurzbeschreibung }}</div>
        <Divider layout="vertical" />
        <div>Content 2</div>
        <br /><br /><br />
      </div>-->
      <div class="grid p-fluid">
        <div class="col-12 md:col-4">
          <div
            style="min-height: 150px"
            class="border-2 border-round surface-border flex align-items-center justify-content-center"
          >
            {{ this.kitaData.kurzbeschreibung }}
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            style="min-height: 150px"
            class="border-2 border-round surface-border flex align-items-center justify-content-center"
          >
            {{ this.kitaData.beschreibung }}
          </div>
        </div>
      </div>
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
    toLowerCaseExceptFirstChar(str) {
      return str[0].toUpperCase() + str.substring(1).toLowerCase()
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

<style scoped>
.kitaviewcontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
