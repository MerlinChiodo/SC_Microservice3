<template>
  <h1>Kita</h1>
  <div>
    <p>Willkommen im smarten Kita-Portal!</p>
    <p>
      Wir befinden uns noch im Aufbau, voraussichtlich bis Ende Juni/Anfang
      Juli.
    </p>
    User ID: {{ user.id }}
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  data() {
    return {
      user: useUserStore(),
    };
  },
};
</script>
