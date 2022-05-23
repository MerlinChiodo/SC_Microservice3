<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="nav">
    <Button
      class="p-button-outlined p-button-rounded"
      label="Home"
      @click="$router.push('/')"
    >
    </Button>
    <Button
      class="p-button-outlined p-button-rounded"
      label="Mitarbeitende"
      @click="$router.push('/employee')"
    >
    </Button>
  </header>
  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  text-align: center;
}
</style>
