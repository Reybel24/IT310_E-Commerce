<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="blue beanie"
      class="test"
      v-bind:style="{ backgroundImage: `url(require('@/asssets/search.png')` }"
    />
    <div class="btn-search">
      <font-awesome-icon :icon="['fa', 'search']" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  props: {},
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
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
