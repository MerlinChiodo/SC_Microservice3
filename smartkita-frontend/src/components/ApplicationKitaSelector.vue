<template>
  <Dropdown
    v-model="selectedKita"
    :options="kitasList"
    optionLabel="name"
    placeholder="Einer Kita zuweisen"
    @change="this.$emit('assignKita', this.selectedKita.id_einrichtung)"
  >
  </Dropdown>
</template>

<script>
export default {
  name: "ApplicationKitaSelector",
  beforeMount() {
    this.getKitasList();
    console.log(this.selectedApplication);
  },
  emits: ["assignKita"],
  inject: ["apiUrl"],
  props: ["selectedApplication"],
  data() {
    return {
      kitasList: null,
      selectedKita: null,
    };
  },
  methods: {
    async getKitasList() {
      const response = await fetch(this.apiUrl + "kitas/all");
      const data = await response.json();
      this.kitasList = data;
      console.log(data);
    },
  },
};
</script>

<style scoped></style>
