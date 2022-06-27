<template>
  <div class="kitaviewcontainer">
    <div class="surface-card p-4 shadow-2 border-round-md">
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
            @click="$emit('applicationMode', true)"
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
            class="border-2 border-round-md surface-border flex align-items-center justify-content-center h-full"
          >
            {{ this.kitaData.kurzbeschreibung }}
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            class="border-2 border-round-md surface-border flex align-items-center justify-content-center h-full"
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
            class="border-2 border-round-md surface-border flex align-items-center justify-content-center h-full"
          >
            {{ kitaData.strasse }} {{ kitaData.hausnr }}<br />
            {{ kitaData.plz }} M*nster
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            {{ kitaData.email }}
            <p>
              <a
                :href="`${kitaData.url_website}`"
                target="_blank"
                style="display: inline"
              >
                {{ kitaData.url_website }}
              </a>
            </p>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div
            class="border-2 border-round-md surface-border flex align-items-center justify-content-center h-full"
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
            class="border-2 border-round-md surface-border flex flex-column align-items-center justify-content-center h-full"
          >
            <h4>Termine</h4>
            <p v-if="!kitaData.termine">Aktuell stehen keine Termine an.</p>
            {{ kitaData.termine }}
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div
            class="border-2 border-round-md surface-border flex align-items-center justify-content-center h-full"
          >
            [ B I L D E R G A L E R I E]
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  <div>
    <h4>Debug data</h4>
    $route.query.id = {{ this.$route.query.id }}
    <h3>Daten</h3>
    {{ this.kitaData }}<br /><br />
  </div>-->
</template>

<script>
export default {
  name: "KitaProfile",
  props: ["kitaData"],
  emits: ["applicationMode"],
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
