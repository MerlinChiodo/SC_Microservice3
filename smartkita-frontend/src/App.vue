<template>
  <div class="nav">
    <header>
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
  --buttonDarkerColor: var(--red-600);
}
body {
  background-color: #fff9f6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav {
  /*text-align: center;*/
  margin-top: -10px;
  margin-left: -9px;
  margin-right: -9px;
  position: sticky;
  top: 0;
  z-index: 100;
}

a:link,
a:visited {
  text-decoration: none;
  color: #5b6679;
}

a:hover,
a:active {
  text-decoration: none;
  color: var(--buttonDarkerColor);
}
</style>
