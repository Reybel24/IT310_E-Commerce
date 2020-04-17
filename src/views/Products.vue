<template>
  <div class="products">
    <listed-product v-for="product in this.products" :key="product.id" :data="product" />
  </div>
</template>

<script>
import ListedProduct from "@/components/ListedProduct.vue";

export default {
  name: "products",
  components: {
    ListedProduct
  },
  data() {
    return {
      products: [
        { id: 0, name: "Baseball Cap", description: "A simple hat", price: 11.99, img: "013-cap.png" },
        { id: 1, name: "Dressman's Hat", description: "A fancy hat", price: 5.99, img: "014-hat.png" },
        { id: 2, name: "Gucci Heels", description: "A fancy pair of shoes", price: 29.50, img: "015-high heels.png" },
      ]
    };
  }
};
</script>

<style scoped>
.products {
  padding: 30px;
  display: flex;
  width: 100%;
}
.products > .product {
  margin-right: 20px;
}
</style>
