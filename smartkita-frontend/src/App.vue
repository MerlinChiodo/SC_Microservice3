<template>
  <div>
    <header class="nav">
      <NavBar />
    </header>
  </div>
  <RouterView />
</template>

<script>
// import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
:root {
  --buttonColor: var(--red-500);
  --buttonHoverColor: var(--red-400);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.nav {
  /*text-align: center;*/
}
</style>
