<template>
  <div class="home">Home page. Wow, much empty.</div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted() {
    // Redirect
    this.$router.push({
      path: "products"
    });
  }
};
</script>

<style scoped lang="scss">
</style>