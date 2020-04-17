<template>
  <div class="product">
    <div class="img">
      <img :src="this.getProductImg()" />
    </div>
    <div class="info">
      <div class="name">{{ this.data.name }}</div>
      <div class="description">{{ this.data.description }}</div>
      <div class="price strong">${{ this.data.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listed-product",
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
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
.product {
  display: flex;
  width: 480px;
  min-width: 285px;
  height: 200px;
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.1);
  outline: 1px solid rgb(245, 245, 245);
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
}

/* Product information UI */
.img {
  width: 35%;
  padding: 10px 20px 20px 20px;
}
.img > img {
  max-width: 95%;
  width: auto;
  height: auto;
}
.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 20px 40px 15px;
  font-size: 1em;
  color: $black;
}
.info > .name {
  text-align: left;
}
.info > .description {
  text-align: left;
  margin-top: 3px;
}
.info > .price {
  text-align: left;
  font-size: 1.2em;
  margin-top: auto;
}
</style>
