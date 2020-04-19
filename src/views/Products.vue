<template>
  <div class="products">
    <div class="header">Products > All (Showing {{ this.products.length }} items)</div>
    <div class="main">
      <div class="filters"></div>
      <div class="right">
        <div class="tags">
          <div
            class="tag"
            :class="{ selected: tag.selected }"
            v-for="(tag, index) in this.filter_tags"
            :key="index"
            v-on:click="toggleTag(tag)"
          >{{ tag.name }}</div>
        </div>
        <div class="mid-header">Products > All (Showing {{ this.products_filtered.length }} items)</div>
        <div class="products-results">
          <listed-product
            v-for="product in this.products_filtered"
            :key="product.id"
            :data="product"
            v-on:add-to-cart="addToCart"
          />
          <div class="loading" v-if="this.products.length < 1">
            <listed-product v-for="product in this.randomIntFromInterval(2, 12)" :key="product.id" />
          </div>
          <div
            class="no-results"
            v-if="this.isReady && this.products_filtered < 1"
          >No matching items</div>
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

// import Vue from "vue";

export default {
  name: "products",
  components: {
    ListedProduct
  },
  data() {
    return {
      products: [],
      products_filtered: [],
      filter_tags: [],
      filter_tags_limit: 12,
      isReady: false,
      cart: []
    };
  },
  methods: {
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    async loadProducts() {
      // Simulate API call Wait
      await this.delay(750);

      this.products = api_data.getProducts();
      this.products_filtered = this.products;
      this.isReady = true;
      // console.log(this.products);
    },
    generateTags() {
      for (let prod of this.products) {
        if (prod.tags != undefined && prod.tags.length > 0) {
          for (let tag of prod.tags) {
            // Add to hash table
            let _tag = this.searchTags(tag);
            if (_tag != false) {
              // Increment frequency
              _tag.frequency = _tag.frequency + 1;
            } else {
              // Create new entry
              this.filter_tags.push({
                name: tag,
                frequency: 1,
                selected: false
              });
            }
          }
        }
      }

      //  Sort list by frequency
      this.filter_tags.sort((a, b) => (a.frequency > b.frequency ? -1 : 1));

      // Trim list
      this.filter_tags = this.filter_tags.slice(0, this.filter_tags_limit);

      console.log(this.filter_tags);
    },
    searchTags(search) {
      for (let tag of this.filter_tags) {
        // console.log(tag);
        if (search == tag.name) {
          return tag;
        }
      }
      return false;
    },
    filterByTags() {
      console.log("filtering by tag...");
      // Filter by all selected tags, if any
      if (this.getSelectedTags().length > 0) {
        this.products_filtered = this.products.filter(prod =>
          this.containsTags(prod)
        );
      } else {
        console.log("No tags selected");
        this.products_filtered = this.products;
      }

      console.log(this.products_filtered);
    },
    toggleTag(tag) {
      if (tag.selected) {
        tag.selected = false;
      } else {
        tag.selected = true;
      }
      this.filterByTags();
    },
    containsTags(product) {
      // Returns true if a product contains a tag
      if (!product.tags) return false;
      // Iterate selected tags
      for (let _tag of this.getSelectedTags()) {
        // console.log(_tag);
        var wasFound = false;
        for (let _prodTag of product.tags) {
          if (_tag.name == _prodTag) {
            wasFound = true;
          }
        }
        if (!wasFound) return false;
      }
      return true;
    },
    getSelectedTags() {
      return this.filter_tags.filter(tag => tag.selected);
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    addToCart(item) {
      this.$store.dispatch({
        type: "addItemToCart",
        item: item
      });
    },
    removeFromCart() {
      // Not implemented yet
    },
    clearCart() {
      this.cart = [];
    },
    calculateCartTotal() {
      var totalCost = 0;
      for (let item of this.cart) {
        totalCost += item.price * item.quantity;
      }
      return totalCost.toFixed(2);
    }
  },
  mounted() {
    // Fetch products
    var _this = this;
    this.loadProducts().then(function() {
      // Generate some tags based on response
      _this.generateTags();
    });
  }
};
</script>

<style scoped lang="scss">
.products {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.header {
  padding: 5px 0px 10px 0px;
  color: $grey;
}
.main {
  width: 100%;
  flex-grow: 1;
}
.filters {
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  flex-shrink: 0;
  display: none;
  width: 300px;
  @include lg {
    display: flex;
  }
}
.right {
  flex-direction: column;
  padding: 0px 10px 10px 30px;
  flex-grow: 1;
  overflow: hidden;
}

.products-results {
  padding: 10px 10px 10px 0px;
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  align-content: flex-start;
}
.products-results .product {
  margin: 8px 16px 8px 0px;
}
.loading {
  display: flex;
  flex-wrap: wrap;
}

/* Tags */
.tag {
  background-color: white;
  color: $blue;
  border: 1px solid $blue;
  border-radius: 30px;
  padding: 3px 11px 3px 11px;
  margin-right: 13px;
  cursor: pointer;
  transition: 0.1s;
}
.tag:hover {
  background-color: $blue;
  color: white;
}
.tag.selected {
  background-color: $blue;
  color: white;
}

.mid-header {
  margin-top: 20px;
}
</style>
