<template>
  <div class="hero">
    <div class="app-name strong">
      <font-awesome-icon :icon="['fa', 'hat-cowboy']" class="icon" />Caps Locker
    </div>

    <search-bar />

    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
    </div>
  </div>
</template>

<script>
// Search bar
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "nav",
  props: {},
  components: {
    SearchBar
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.hero {
  background-color: $purple;
  padding: 25px 30px 20px 30px;
  justify-content: space-between;
  border-bottom: 5px solid $dark-purple;
}
#nav {
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  color: white;
  padding: 5px 6px 5px 6px;
}
#nav a.router-link-exact-active {
}

.app-name {
  color: white;
  font-size: 1em;
  align-items: center;
}
.app-name .icon {
  font-size: 1.7em;
  margin-right: 14px;
}

.search-bar {
  width: 60%;
  height: 39px;
}
.search-bar > input {
  width: 100%;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
  border: none;
  padding: 0px 20px 0px 20px;
  font-size: 0.9em;
  color: $black;
  overflow: hidden;
}
.search-bar > input::placeholder {
  color: $light-grey;
}
.search-bar > input:focus {
  outline: none;
}
.search-bar .icon {
}

.btn-search {
  width: 80px;
  height: 100%;
  background-color: $dark-purple;
  border-radius: 0px 30px 30px 0px;
  color: white;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 1px 0px;
  cursor: pointer;
  transition: 0.2s;
  opacity: 0.85;
}
.btn-search:hover {
  opacity: 1;
}
</style>
