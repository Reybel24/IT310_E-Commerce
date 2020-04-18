<template>
  <div class="btn" v-on:click="onPress">
    <font-awesome-icon :icon="['fa', 'shopping-cart']" class="icon" />
    <div class="name strong">{{ this.name }}</div>
  </div>
</template>

<script>
export default {
  name: "rounded-button",
  props: {
    name: {
      type: String,
      default: "",
      required: false
    }
  },
  components: {},
  methods: {
    getProductImg() {
      if (!this.data.img) return null;
      return require("@/assets/products/" + this.data.img);
    },
    onPress() {
      this.$emit("press");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 8px 11px 8px 11px;
  display: flex;
  background-color: white;
  border-radius: 15px;
  color: $blue;
  transition: 0.12s;
  font-size: 0.75em;
  align-items: center;
  border: 1px solid $blue;
  opacity: .8;
}
.btn:hover {
  background-color: $blue;
  color: white;
  opacity: 1;
}
.icon {
    font-size: .9em;
}
.name {
    margin-left: 6px;
}
</style>
