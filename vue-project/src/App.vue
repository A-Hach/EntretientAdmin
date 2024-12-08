<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Layout/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

