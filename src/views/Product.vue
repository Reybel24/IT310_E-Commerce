<template>
  <div class="container">
    <div class="crumbtrail">Hats {{ (this.isReady) ? " > " + this.product.name : "" }}</div>
    <div class="product">
      <div class="img">
        <div class="empty">
          <font-awesome-icon :icon="['fa', 'hat-cowboy']" class="icon" v-if="!this.isReady" />
        </div>
        <img :src="this.getProductImg(this.product)" v-if="this.isReady" />
      </div>
      <div class="details">
        <div class="name strong" v-if="this.isReady">{{ this.product.name }}</div>
        <div class="seller" v-if="this.isReady">
          <span>by</span>
          <span
            class="strong"
          >{{ (this.product.seller != undefined) ? this.product.seller : "Unknown Seller" }}</span>
        </div>
        <div class="rating">
          <rating-stars :rating="this.product.rating" v-if="this.isReady" />
          {{ this.productReviews.length }} reviews
        </div>
        <div class="price strong" v-if="this.isReady">${{ this.product.price }}</div>
        <div class="desc" v-if="this.isReady">{{ this.product.description_long }}</div>
        <div class="a-box">
          <rounded-button
            name="ADD TO BAG"
            v-if="this.isReady"
            v-on:press="pressAddToCart"
            class="btn btn-add-to-cart"
          />
          <rounded-button
            name="ADD TO LIST"
            v-if="this.isReady"
            v-on:press="pressAddToCart"
            class="btn btn-add-to-list"
            variant="outline"
          />
        </div>
      </div>
    </div>

    <div class="related-products">
      <div class="head strong">Customers who bought this also looked at</div>
      <div class="grid">
        <div class="loading" v-if="!this.relatedProductsIsReady">
          <div class="related-product" v-for="num in 5" :key="num">
            <div class="img bg-cover"></div>
            <div class="name bg-cover">None</div>
          </div>
        </div>

        <div class="empty" v-if="this.relatedProductsIsReady && this.relatedProducts.length < 1">
          <font-awesome-icon :icon="['fa', 'frown']" class="icon" />
          <span class="strong">No related items found</span>
        </div>

        <div
          class="related-product"
          v-for="(prod, index) in relatedProducts"
          :key="index"
          v-on:click="browseToProduct(prod.id)"
        >
          <div class="img">
            <img :src="getProductImg(prod)" />
          </div>
          <div class="name">{{ prod.name }}</div>
        </div>
      </div>
    </div>

    <div class="reviews" v-if="this.isReady">
      <div class="head strong">REVIEWS</div>
      <div class="leave-a-review">
        <textarea placeholder="Write a review" />
      </div>
      <product-review v-for="(review, index) in productReviews" :key="index" :review="review" />
    </div>
    <toast :title="this.toast.title" v-if="1==2" />
    <div class="toasts-container" ref="toastsContainer"></div>
  </div>
</template>

<script>
// Toast notification
import Toast from "@/components/Toast.vue";

// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";
import RatingStars from "@/components/UI/RatingStars.vue";
import ProductReview from "@/components/ProductReview.vue";

// Common utility functions
import {
  fetchProductImg,
  randomNumberBetween,
  browseToProduct
} from "@/util/common.js";

// Import vue
import Vue from "vue";

export default {
  name: "product",
  props: {},
  components: {
    RatingStars,
    RoundedButton,
    ProductReview,
    Toast
  },
  data() {
    return {
      isReady: false,
      productId: null,
      product: null,
      productReviews: [],
      relatedProducts: [],
      relatedProductsIsReady: false,

      // Methods
      randomNumberBetween,
      browseToProduct
    };
  },
  methods: {
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    async loadPage() {
      this.isReady = false;
      this.relatedProductsIsReady = false;
      this.relatedProducts = [];

      // Fetch product data
      await this.loadProduct();
      await this.loadProductReviews();
      this.relatedProducts = await this.getRelatedProducts();
    },
    async loadProduct() {
      // Get data by product id
      this.productId = this.$route.params.id;
      this.product = await this.$store.dispatch({
        type: "fetchProduct",
        id: parseInt(this.productId)
      });

      // Set ready
      this.isReady = true;
    },
    async loadProductReviews() {
      this.productReviews = await this.$store.dispatch({
        type: "fetchProductReviews",
        id: parseInt(this.productId)
      });

      // Set ready
      this.isReady = true;
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    addToCart(item) {
      this.$store.dispatch({
        type: "addItemToCart",
        item: item
      });
      this.createToast(item.name + " added to cart!", item.img);
    },
    getProductImg(prod) {
      return fetchProductImg(prod);
    },
    pressAddToCart() {
      this.$store.dispatch({
        type: "addItemToCart",
        item: this.product
      });
      this.createToast(this.product.name + " added to cart!", this.product.img);
    },
    createToast(title, img) {
      var ComponentClass = Vue.extend(Toast);
      var instance = new ComponentClass({
        propsData: {
          title: title,
          img: img
        }
      });
      instance.$mount();
      this.$refs.toastsContainer.appendChild(instance.$el);
    },
    async getRelatedProducts() {
      var related = await this.$store.dispatch({
        type: "fetchRelatedProducts",
        id: this.productId
      });
      this.relatedProductsIsReady = true;
      return related;
    }
  },
  mounted() {
    this.loadPage();
  },
  watch: {
    $route() {
      // When route changes, reload data with new product id
      this.loadPage();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 75%;
  margin: 0 auto;
  flex-direction: column;
}

// Current product
.product {
  flex-direction: row;
  min-height: 365px;

  .img {
    width: 20%;
    height: min-content;
    padding: 30px;
    align-items: center;
    justify-content: center;

    img {
      width: 95%;
      height: 95%;
      object-fit: contain;
      transition: 0.2s;
    }

    .empty {
      font-size: 8em;
      color: $lighter-grey;
    }
  }

  .product:hover > .img > img {
    transform: scale(1.1, 1.1);
  }

  .details {
    flex-direction: column;
    font-size: 1em;
    justify-content: flex-start;
    padding-left: 30px;
    width: 50%;

    // Product name
    .name {
      color: $black;
      font-size: 1.2em;
    }

    .price {
      color: $grey;
      font-size: 1.4em;
      margin-top: 5px;
    }

    .seller {
      color: $grey;
      font-size: 0.8em;
      padding: 3px 0 0 0;

      span {
        padding-right: 5px;
      }
    }

    .rating {
      color: $grey;
      font-size: 1em;
      margin-top: 5px;
    }

    // Description
    .desc {
      font-size: 0.9em;
      text-align: left;
      padding: 10px 0 0 0;
      line-height: 26px;
      width: 90%;
    }
  }
}

// Buttons
.a-box {
  width: 100%;
  margin-left: auto;
  flex-direction: row;
  font-size: 1em;
  margin-top: 20px;

  .btn {
    width: 30%;
    align-self: center;
    border-radius: 5px;
    font-size: 0.9em;
    margin-top: auto;
    height: 30px;
  }
  .btn-add-to-cart {
    background-color: #f2b05f;
    color: #8b5007;
  }

  .btn-add-to-list {
    margin-left: 20px;
  }
}

// Navigation
.crumbtrail {
  margin-bottom: 14px;
  font-size: 0.9em;
  color: $black;
}

// Related products
.related-products {
  width: 100%;
  padding: 10px 0 0 10px;
  margin-bottom: 20px;
  justify-content: flex-start;
  margin-top: 20px;
  flex-direction: column;

  .grid {
    margin-top: 20px;
  }

  .head {
    font-size: 1em;
    color: $black;
  }

  .empty {
    color: $grey;
    align-items: center;

    .icon {
      font-size: 3em;
      margin-right: 10px;
      color: $light-grey;
    }
  }

  .related-product {
    margin-right: 15px;
    color: $grey;
    width: 137px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .img {
      width: 50%;
      height: min-content;
      padding: 30px;
      align-items: center;
      justify-content: center;
      border: 1px solid $lighter-grey;

      img {
        width: 95%;
        height: 95%;
        object-fit: contain;
        transition: 0.2s;
      }
    }

    .name {
      margin-top: 7px;
    }
  }
}

// Reviews
.reviews {
  width: 100%;
  max-width: 1300px;
  flex-direction: column;
  font-size: 1em;
  color: $black;
  margin-top: 30px;

  .head {
    font-size: 1.1em;
    margin-bottom: 20px;
  }

  .review {
    margin: 0 0 40px 0;
  }
}

// Leave a review box
.leave-a-review {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  color: $black;

  textarea {
    width: 85%;
    height: 60px;
    border: 1px solid $lighter-grey;
    border-radius: 4px;
    padding: 15px 0 0 20px;
    resize: none;
  }
}

// Toast notification
.toasts-container {
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  right: 40px;

  .toast {
    margin-top: 10px;
  }
}

.bg-cover {
  background-color: $lighter-grey;
  color: $lighter-grey;
}
</style>
