<template>
  <div class="products">
    <div class="header">
      Products > All (Showing {{ this.products.length }} items)
    </div>
    <div class="main">
      <div class="filters"></div>
      <div class="products-results">
        <listed-product v-for="product in this.products" :key="product.id" :data="product" />
      </div>
    </div>
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
        {
          id: 0,
          name: "Baseball Cap",
          description: "A simple hat",
          price: 11.99,
          img: "013-cap.png",
          rating: 4.5
        },
        {
          id: 1,
          name: "Dressman's Hat",
          description: "A fancy hat",
          price: 5.99,
          img: "014-hat.png",
          rating: 2
        },
        {
          id: 2,
          name: "Gucci Heels",
          description: "A fancy pair of shoes",
          price: 29.5,
          img: "015-high heels.png",
          rating: 5
        },
        {
          id: 3,
          name: "Heart Pajamas",
          description: "Cute women's pajamas",
          price: 29.5,
          img: "008-pajamas.png",
          rating: 4.5
        },
        {
          id: 4,
          name: "Pink Dress",
          description: "Women's pink dress",
          price: 29.5,
          img: "010-dress.png",
          rating: 2.5
        },
        {
          id: 5,
          name: "Soft Socks",
          description: "Softest socks ever",
          price: 9.99,
          img: "022-socks.png",
          rating: 4
        },
        {
          id: 6,
          name: "Men's Shorts",
          description: "Some shorts",
          price: 14.99,
          img: "016-shorts.png",
          rating: 1
        },
        {
          id: 7,
          name: "Men's Suit",
          description: "Wedding suit",
          price: 179.99,
          img: "029-wedding suit.png",
          rating: 1.5
        },
        {
          id: 8,
          name: "Winter Beanie",
          description: "A winter hat",
          price: 12.99,
          img: "030-wool hat.png",
          rating: 5
        },
        {
          id: 9,
          name: "Bath Robe",
          description: "A blue robe",
          price: 12.99,
          img: "004-bathrobe.png",
          rating: 3.5
        }
      ]
    };
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
.products-results > .product {
  margin: 8px;
}
</style>
