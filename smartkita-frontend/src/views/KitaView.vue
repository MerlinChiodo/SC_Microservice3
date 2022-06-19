<template>
  <div class="kitaviewcontainer">
    <div class="card">
      <h1>KitaView</h1>
      {{ this.$route.query.id }}
      <h3>Daten</h3>
      {{ this.kitaData }}<br /><br />
    </div>

    <div class="surface-card p-4 shadow-2 border-round" v-if="this.kitaData">
      <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-start w-8rem"></div>
        <div
          class="text-3xl font-medium text-900 mb-3 flex align-items-center justify-content-center"
        >
          {{ this.kitaData.name }}
        </div>
        <div class="flex align-items-center justify-content-end w-8rem">
          <Button type="button" icon="pi pi-bookmark"></Button>
          <Button
            type="button"
            icon="pi pi-file"
            style="margin-left: 3px"
          ></Button>
        </div>
      </div>
      <div class="font-medium text-500 mb-3">
        {{ this.kitaData.traeger }} |
        {{
          toLowerCaseExceptFirstChar(
            kitaData.traeger_kategorie
          ) /* enum is sent as uppercase */
        }}
      </div>
      <!--   Kurzbeschreibung & Beschreibung   -->
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            {{ this.kitaData.kurzbeschreibung }}
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            {{ this.kitaData.beschreibung }}
          </div>
        </div>
      </div>
      <!--   Kontaktdaten   -->
      <h3>Kontakt</h3>
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            {{ kitaData.strasse }} {{ kitaData.hausnr }}<br />
            {{ kitaData.plz }} M*nster
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            {{ kitaData.email }}
            <br />
            <a
              :href="`${kitaData.url_website}`"
              target="_blank"
              style="display: inline-block; float: start"
            >
              <div style="display: inline-block">
                {{ kitaData.url_website }}
              </div>
            </a>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            Alter: {{ kitaData.kindalter_von }} bis
            {{ kitaData.kindalter_bis }} Jahre<br />
            Schwerpunkt: {{ this.schwerpunktFormatted }}
          </div>
        </div>
      </div>
      <div class="grid p-fluid" style="min-height: 150px">
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            <h4>Termine</h4>
            {{ kitaData.termine }}
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            class="border-2 border-round surface-border flex align-items-center justify-content-center h-full"
          >
            [ B I L D E R G A L E R I E]
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

<style scoped>
.kitaviewcontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
.p-button {
  background-color: var(--buttonColor);
}

.p-button:hover {
  background-color: var(--buttonHoverColor) !important;
}

.p-button:active,
.p-button:focus {
  background-color: var(--buttonDarkerColor) !important;
}
</style>
