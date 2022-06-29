<template>
  <Dropdown
    v-model="selectedKita"
    :options="kitasList"
    optionLabel="name"
    placeholder="Einer Kita zuweisen"
  >
  </Dropdown>
</template>

<script>
export default {
  name: "ApplicationKitaSelector",
  beforeMount() {
    this.getKitasList();
  },
  emits: ["assignKita"],
  inject: ["apiUrl"],
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
