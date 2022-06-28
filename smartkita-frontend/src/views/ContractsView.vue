<template>
  <h1>Verträge</h1>
  <p>{{ this.contractsList }}</p>
</template>

<script>
export default {
  name: "ContractsView",
  beforeMount() {
    this.getContractsList();
  },
  data() {
    return {
      contractsList: null,
    };
  },
  inject: ["apiUrl"],
  methods: {
    async getContractsList() {
      const response = await fetch(this.apiUrl + "contracts/all");
      const data = await response.json();
      this.contractsList = data;
    },
  },
};
</script>

<style scoped></style>
