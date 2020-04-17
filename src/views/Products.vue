<template>
  <div class="products">
    <div class="header">Products > All (Showing {{ this.products.length }} items)</div>
    <div class="main">
      <div class="filters"></div>
      <div class="products-results">
        <listed-product v-for="product in this.products" :key="product.id" :data="product" />
        <div class="loading" v-if="this.products.length < 1">
          <listed-product v-for="product in 12" :key="product.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Product card
import ListedProduct from "@/components/ListedProduct.vue";

// Products data (this will eventually be pulled from API instead)
import api_data from "@/data/products.js";

export default {
  name: "products",
  components: {
    ListedProduct
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    async loadProducts() {

      // Simulate API call Wait
      await this.delay(1000);

      this.products = api_data.getProducts();
      // console.log(this.products);
    }
  },
  mounted() {
    // Fetch products
    this.loadProducts();
  }
};
</script>

<style scoped lang="scss">
.products {
  display: flex;
  flex-direction: column;
}
.header {
  padding: 5px 0px 10px 0px;
  color: $grey;
}
.main {
  width: 100%;
}
.filters {
  width: 300px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  flex-shrink: 0;
}

.products-results {
  padding: 10px 10px 10px 30px;
  display: flex;
  flex-wrap: wrap;
}
.products-results .product {
  margin: 8px;
}
.loading {
  display: flex;
  flex-wrap: wrap;
}
</style>
