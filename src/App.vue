<template>
  <div id="app">
    <Nav />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
// Navigation bar
import Nav from "@/components/Nav.vue";

export default {
  name: "#app",
  components: {
    Nav
  },
  methods: {}
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  height: 100vh;
}

.content {
  display: flex;
  padding: 20px;
  flex-grow: 1;
}
</style>
