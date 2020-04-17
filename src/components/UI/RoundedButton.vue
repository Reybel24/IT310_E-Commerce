<template>
  <div class="btn">
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
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 8px 11px 8px 11px;
  display: flex;
  background-color: white;
  box-shadow: 0 0 3px $blue;
  border-radius: 15px;
  color: $blue;
  transition: 0.12s;
  font-size: 0.75em;
  align-items: center;
}
.btn:hover {
  background-color: $blue;
  color: white;
}
.icon {
    font-size: .9em;
}
.name {
    margin-left: 6px;
}
</style>
